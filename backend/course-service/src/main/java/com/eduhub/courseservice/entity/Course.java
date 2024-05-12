package com.eduhub.courseservice.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
@Entity
@Table(name = "course")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_id")
    private Long courseId;
    @Column(name = "title")
    private String title;
    @Column(name = "titleImage")
    private String titleImage;
    @Column(name = "outcomes")
    private ArrayList<String> outcomes;
    @Column(name = "structure")
    private String structure;
    @Column(name = "description")
    private String description;
    @Column(name = "status")
    private String status;
    @ManyToMany(fetch = FetchType.EAGER)
//    @JoinTable(name = "mainTopics")
    @JoinTable(
            name = "course_main_topic", // Name of the join table
            joinColumns = @JoinColumn(name = "course_id", referencedColumnName = "course_id"), // Column referencing Course
            inverseJoinColumns = @JoinColumn(name = "main_topic_id", referencedColumnName = "main_topic_id") // Column referencing MainTopic
    )
    private List<MainTopic> mainTopics;
}
