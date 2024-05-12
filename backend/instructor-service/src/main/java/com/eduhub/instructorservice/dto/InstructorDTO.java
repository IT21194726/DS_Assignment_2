package com.eduhub.instructorservice.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class InstructorDTO {
    private Long learnerId;
    private String firstName;
    private String lastName;
    private String phone;
    private String address;
    private String city;
    private String country;
}
