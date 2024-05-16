package com.eduhub.learnerservice.dto;

import com.eduhub.learnerservice.dto.authentication.response.JwtResponse;
import com.eduhub.learnerservice.entity.Learner;
import com.eduhub.learnerservice.entity.LearnerHasUserInformation;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class LearnerResponseDTO {
    private Learner learner;
    private JwtResponse jwtResponse;
    private LearnerHasUserInformation learnerHasUserInformation;
}
