package com.eduhub.courseservice.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
@RequiredArgsConstructor
public class MainTopicDTO {
    private Long mainTopicId;
    private String title;
    private String description;
    private ArrayList<SubTopicDTO> subtopics;
    private ArrayList<QuizDTO> quizzes;
}
