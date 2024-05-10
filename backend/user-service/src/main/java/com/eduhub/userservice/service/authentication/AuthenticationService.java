package com.spring.childhealthcare.service.authentication;

import com.spring.childhealthcare.dto.authentication.request.LoginRequest;
import com.spring.childhealthcare.dto.authentication.request.SignupRequest;
import com.spring.childhealthcare.dto.authentication.response.JwtResponse;
import com.spring.childhealthcare.dto.authentication.response.MessageResponse;
import org.springframework.http.ResponseEntity;

public interface AuthenticationService {
    ResponseEntity<JwtResponse> authenticateUserDetails(LoginRequest loginRequest);

    ResponseEntity<MessageResponse> registerUserDetails(SignupRequest signUpRequest);
}
