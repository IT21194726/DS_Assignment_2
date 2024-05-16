//Service Implementation Class
package com.eduhub.learnerservice.service.impl;

import com.eduhub.learnerservice.client.UserServiceClient;
import com.eduhub.learnerservice.common.CommonResponse;
import com.eduhub.learnerservice.dto.LearnerDTO;
import com.eduhub.learnerservice.dto.LearnerResponseDTO;
import com.eduhub.learnerservice.dto.authentication.response.JwtResponse;
import com.eduhub.learnerservice.dto.authentication.response.MessageResponse;
import com.eduhub.learnerservice.entity.Learner;
import com.eduhub.learnerservice.entity.LearnerHasUserInformation;
import com.eduhub.learnerservice.mapper.LearnerMapper;
import com.eduhub.learnerservice.repository.LearnerHasUserInformationRepository;
import com.eduhub.learnerservice.repository.LearnerRepository;
import com.eduhub.learnerservice.service.LearnerService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class LearnerServiceImpl implements LearnerService {
    private final LearnerRepository learnerRepository;
    private final LearnerMapper learnerMapper;
    private final UserServiceClient userServiceClient;
    private final LearnerHasUserInformationRepository learnerHasUserInformationRepository;

    @Override
    public CommonResponse getAllLearnerDetails() {
        log.info("LearnerServiceImpl.getAllLearnerDetails method accessed");
        CommonResponse commonResponse = new CommonResponse();
        List<LearnerDTO> learnerDTOS = new ArrayList<>();
        List<Learner> learners = learnerRepository.findAll();
        learners.forEach(learner ->  learnerDTOS.add(learnerMapper.domainToDto(learner)));
        if (learners.isEmpty()) {
            commonResponse.setStatus(HttpStatus.OK);
            commonResponse.setData(new ArrayList<>());
            commonResponse.setMessage("Learner details list not available!");
            log.warn("Learner details not available. message :{}", commonResponse.getMessage());
            return commonResponse;
        }
        commonResponse.setStatus(HttpStatus.OK);
        commonResponse.setMessage("Learner details are fetching success!");
        commonResponse.setData(learnerDTOS);
        log.info("LearnerServiceImpl.getAllLearnerDetails method end");
        return commonResponse;
    }

    @Override
    public CommonResponse getLearnersDetailsById(Long learnerId) {
        log.info("LearnerServiceImpl.getLearnersDetailsById method accessed");
        LearnerDTO learnerDTO;
        CommonResponse commonResponse = new CommonResponse();
        Optional<Learner> learner = learnerRepository.findById(learnerId);
        if(learner.isPresent()) {
            learnerDTO = learnerMapper.domainToDto(learner.get());
        } else {
            commonResponse.setStatus(HttpStatus.OK);
            commonResponse.setData(new ArrayList<>());
            commonResponse.setMessage("Learner details is not available!");
            log.warn("Learner details not available. message : {} ", commonResponse.getMessage());
            return commonResponse;
        }
        commonResponse.setStatus(HttpStatus.OK);
        commonResponse.setMessage("Learner details is fetching success!");
        commonResponse.setData(learnerDTO);
        log.info("LearnerServiceImpl.getLearnersDetailsById method end");
        return commonResponse;
    }

    @Override
    public CommonResponse saveLearner(LearnerDTO learnerDTO) {
        log.info("LearnerServiceImpl.saveLearner method accessed");
        CommonResponse commonResponse = new CommonResponse();
        ObjectMapper objectMapper = new ObjectMapper();
        LearnerResponseDTO learnerResponseDTO = new LearnerResponseDTO();
        Optional<Learner> learner = learnerRepository.findById(learnerDTO.getLearnerId());
        if(learner.isPresent()){
            commonResponse.setStatus(HttpStatus.BAD_REQUEST);
            commonResponse.setMessage("Learner details already exist!");
            commonResponse.setData(learnerMapper.domainToDto(learner.get()));
            log.warn("Learner details not exist. message : {}", commonResponse.getMessage());
            return commonResponse;
        }
        MessageResponse userResponse = userServiceClient.registerUser(learnerDTO.getSignupRequest()).getBody();
        assert userResponse != null;
        JwtResponse userJwtResponse = objectMapper.convertValue(userResponse.getData(), JwtResponse.class);
        Learner learnerSavedDetails = new Learner();
        LearnerHasUserInformation learnerHasUserInformation = new LearnerHasUserInformation();
        if (userResponse.getData() != null) {
            learnerSavedDetails = learnerRepository.save(learnerMapper.dtoToDomain(learnerDTO, new Learner()));
            learnerHasUserInformation.setUserId(userJwtResponse.getId());
            learnerHasUserInformation.setCreatedDate(LocalDateTime.now());
            learnerHasUserInformation.setLearner(learnerSavedDetails);
            learnerHasUserInformationRepository.save(learnerHasUserInformation);
        }
        learnerResponseDTO.setLearner(learnerSavedDetails);
        learnerResponseDTO.setJwtResponse(userJwtResponse);
        learnerResponseDTO.setLearnerHasUserInformation(learnerHasUserInformation);
        commonResponse.setStatus(HttpStatus.CREATED);
        commonResponse.setMessage("Learner details saved success!");
        commonResponse.setData(learnerMapper.domainToDto(learnerSavedDetails));
        log.info("LearnerServiceImpl.saveLearner method end");
        return commonResponse;
    }

    @Override
    public CommonResponse updateLearner(LearnerDTO learnerDTO) {
        log.info("LearnerServiceImpl.updateLearner method accessed");
        CommonResponse commonResponse = new CommonResponse();
        Optional<Learner> learner = learnerRepository.findById(learnerDTO.getLearnerId());
        if(learner.isEmpty()) {
            commonResponse.setStatus(HttpStatus.BAD_REQUEST);
            commonResponse.setMessage("Learner details not available!");
            commonResponse.setData(new ArrayList<>());
            log.warn("Learner detail not available. message : {}", commonResponse.getMessage());
            return commonResponse;
        }
        Learner learnerUpdatedDetails = learnerRepository.save(learnerMapper.dtoToDomain(learnerDTO, learner.get()));
        commonResponse.setStatus(HttpStatus.OK);
        commonResponse.setMessage("Learner details is update success!");
        commonResponse.setData(learnerMapper.domainToDto(learnerUpdatedDetails));
        log.info("LearnerServiceImpl.updateLearner method end");
        return commonResponse;
    }

    @Override
    public CommonResponse deleteLearnerDetailsById(Long learnerId) {
        log.info("LearnerServiceImpl.deleteLearnerDetailsById method accessed");
        CommonResponse commonResponse = new CommonResponse();
        Optional<Learner> learner = learnerRepository.findById(learnerId);
        if(learner.isEmpty()) {
            commonResponse.setStatus(HttpStatus.BAD_REQUEST);
            commonResponse.setMessage("Delete learner details not available!");
            commonResponse.setData(new ArrayList<>());
            log.warn("Learner details not available. message : {}", commonResponse.getMessage());
            return commonResponse;
        }
        learnerRepository.deleteById(learnerId);
        commonResponse.setStatus(HttpStatus.OK);
        commonResponse.setMessage("Learner details is delete success!");
        commonResponse.setData(new ArrayList<>());
        log.info("LearnerServiceImpl.deleteLearnerDetailsById method end");
        return commonResponse;
    }

    @Override
    public CommonResponse deleteLearners() {
        log.info("LearnerServiceImpl.deleteLearners method accessed");
        CommonResponse commonResponse = new CommonResponse();
        List<Learner> learners = learnerRepository.findAll();
        if(learners.isEmpty()) {
            commonResponse.setStatus(HttpStatus.BAD_REQUEST);
            commonResponse.setMessage("Delete learners details not available!");
            commonResponse.setData(new ArrayList<>());
            log.warn("Learner details not available. message : {}", commonResponse.getMessage());
            return commonResponse;
        }
        learnerRepository.deleteAll();
        commonResponse.setStatus(HttpStatus.OK);
        commonResponse.setMessage("Learner details is delete success!");
        commonResponse.setData(new ArrayList<>());
        log.info("LearnerServiceImpl.deleteLearners method end");
        return commonResponse;
    }
}
