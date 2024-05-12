package com.eduhub.learnerservice.dto;

import lombok.*;

@Getter
@Setter
@RequiredArgsConstructor
public class LearnerDTO {
    private Long learnerId;
    private String firstName;
    private String lastName;
    private String phone;
    private String address;
    private String city;
    private String country;
}
