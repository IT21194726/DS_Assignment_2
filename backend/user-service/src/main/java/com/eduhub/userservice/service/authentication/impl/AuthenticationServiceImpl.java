package com.spring.childhealthcare.service.authentication.impl;

import com.spring.childhealthcare.common.Constant;
import com.spring.childhealthcare.dto.DoctorDTO;
import com.spring.childhealthcare.dto.PatientDTO;
import com.spring.childhealthcare.dto.authentication.request.LoginRequest;
import com.spring.childhealthcare.dto.authentication.request.SignupRequest;
import com.spring.childhealthcare.dto.authentication.response.JwtResponse;
import com.spring.childhealthcare.dto.authentication.response.MessageResponse;
import com.spring.childhealthcare.entity.authentication.ERole;
import com.spring.childhealthcare.entity.authentication.Role;
import com.spring.childhealthcare.entity.authentication.User;
import com.spring.childhealthcare.exception.ReferenceNotFoundException;
import com.spring.childhealthcare.repository.authentication.RoleRepository;
import com.spring.childhealthcare.repository.authentication.UserRepository;
import com.spring.childhealthcare.security.jwt.JwtUtils;
import com.spring.childhealthcare.security.services.UserDetailsImpl;
import com.spring.childhealthcare.service.DoctorService;
import com.spring.childhealthcare.service.PatientService;
import com.spring.childhealthcare.service.authentication.AuthenticationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder encoder;
    private final JwtUtils jwtUtils;
    private final DoctorService doctorService;
    private final PatientService patientService;

    @Override
    public ResponseEntity<JwtResponse> authenticateUserDetails(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    @Override
    public ResponseEntity<MessageResponse> registerUserDetails(SignupRequest signUpRequest) {
        if (Boolean.TRUE.equals(userRepository.existsByUsername(signUpRequest.getUsername()))) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!", new User()));
        }
        if (Boolean.TRUE.equals(userRepository.existsByEmail(signUpRequest.getEmail()))) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!", new User()));
        }
        // Create new user's account
        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = signUpRequest.getRoles();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_PATIENT)
                    .orElseThrow(() -> new RuntimeException("Error: Student role is not available."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin" -> {
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Admin role is not found."));
                        roles.add(adminRole);
                    }
                    case "doctor" -> {
                        Role modRole = roleRepository.findByName(ERole.ROLE_DOCTOR)
                                .orElseThrow(() -> new RuntimeException("Error: Doctor role is not found."));
                        roles.add(modRole);
                    }
                    default -> {
                        Role userRole = roleRepository.findByName(ERole.ROLE_PATIENT)
                                .orElseThrow(() -> new RuntimeException("Error: Patient role is not found."));
                        roles.add(userRole);
                    }
                }
            });
        }
        user.setRoles(roles);
        String userId = sequentialUserByIdGenerator(roles);
        if(userId.matches("PT-"+LocalDate.now().getYear()+LocalDate.now().getDayOfMonth()+Constant.NUMBER_FORMAT_ACTION) && userRepository.findUserByUserIdIgnoreCase(userId).isEmpty()) {
            user.setUserId(userId);
        } else if (userId.matches("AM-"+LocalDate.now().getYear()+Constant.NUMBER_FORMAT_ACTION) && userRepository.findUserByUserIdIgnoreCase(userId).isEmpty()) {
            user.setUserId(userId);
        } else if (userId.matches("DC-"+LocalDate.now().getYear()+Constant.NUMBER_FORMAT_ACTION) && userRepository.findUserByUserIdIgnoreCase(userId).isEmpty()) {
            user.setUserId(userId);
        } else {
            throw new ReferenceNotFoundException("The userId no matches require pattern or the userId is already exist!");
        }
        User savedUser = userRepository.save(user);
        if (savedUser.getUserId().contains("DC")) {
            DoctorDTO doctorDTO = new DoctorDTO();
            doctorDTO.setDoctorId(savedUser.getUserId());
            doctorService.saveDoctor(doctorDTO);
        } else if (savedUser.getUserId().contains("PT")) {
            PatientDTO  patientDTO = new PatientDTO();
            patientDTO.setPatientId(savedUser.getUserId());
            patientService.savePatient(patientDTO);
        }

        return ResponseEntity.ok(new MessageResponse("User registered successfully!", user));
    }

    private String sequentialUserByIdGenerator(Set<Role> role) {
        int userNumber;
        List<User> userList = userRepository.findAll().stream().toList();
        String userId = "";
        if (!userList.isEmpty())
            userId = userList.get(userList.size() - 1).getUserId();
        userId = userId.isEmpty()? "0" : userId.substring(userId.length() - 3);
        userNumber = Integer.parseInt(userId);
        userNumber++;
        if (role.stream().findFirst().orElse(new Role()).getName().name().equals(ERole.ROLE_PATIENT.name())){
            userId = String.format(Constant.PATIENT_ID_FORMAT, LocalDate.now().getYear(), LocalDate.now().getDayOfMonth(),userNumber);
        } else if (role.stream().findFirst().orElse(new Role()).getName().name().equals(ERole.ROLE_DOCTOR.name())){
            userId = String.format(Constant.DOCTOR_ID_FORMAT, LocalDate.now().getYear(), userNumber);
        } else if (role.stream().findFirst().orElse(new Role()).getName().name().equals(ERole.ROLE_ADMIN.name())) {
            userId = String.format(Constant.ADMIN_ID_FORMAT, LocalDate.now().getYear(), userNumber);
        }
        return userId;
    }
}
