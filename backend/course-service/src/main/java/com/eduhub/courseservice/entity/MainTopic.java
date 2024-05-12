package com.eduhub.courseservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
@Entity
@Table(name = "main_topic")
public class MainTopic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "main_topic_id")
    private Long mainTopicId;
    @Column(name = "title")
    private String title;
    @Column(name = "description")
    private String description;
    @Column(name = "subTopics")
    private ArrayList<SubTopic> subTopics;
    @OneToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "quizzes")
    private List<Quiz> quizzes;
    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "courses")
    private ArrayList<Course> courses;
}
