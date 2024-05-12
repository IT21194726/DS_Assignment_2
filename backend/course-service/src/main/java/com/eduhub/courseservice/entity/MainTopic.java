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
//    @JoinTable(name = "quizzes")
    @JoinTable(
            name = "main_topic_quiz", // Name of the join table
            joinColumns = @JoinColumn(name = "main_topic_id", referencedColumnName = "main_topic_id"), // Column referencing Course
            inverseJoinColumns = @JoinColumn(name = "quiz_id", referencedColumnName = "quiz_id") // Column referencing MainTopic
    )
    private List<Quiz> quizzes;
    @JsonIgnore
    @ManyToMany(mappedBy = "mainTopics", fetch = FetchType.LAZY)
    private List<Course> courses;
}
