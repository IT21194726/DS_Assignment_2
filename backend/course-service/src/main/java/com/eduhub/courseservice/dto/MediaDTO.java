package com.eduhub.courseservice.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class MediaDTO {
    private Long mediaId;
    private String fileName;
    private String contentType;
    private byte[] data;
}
