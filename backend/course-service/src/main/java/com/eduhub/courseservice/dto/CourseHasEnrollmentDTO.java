package com.eduhub.courseservice.dto;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class CourseHasEnrollmentDTO {
    private Long courseHasEnrollmentId;
    private Long learnerId;
    private Long financeId;
}
