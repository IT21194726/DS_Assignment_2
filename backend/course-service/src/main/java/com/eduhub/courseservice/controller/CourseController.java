package com.eduhub.courseservice.controller;

import com.eduhub.courseservice.common.CommonResponse;
import com.eduhub.courseservice.dto.CourseDTO;
import com.eduhub.courseservice.service.CourseService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/api/course")
@Slf4j
public class CourseController {
    private final CourseService courseService;
    /**
     * Get all course
     *
     * @return success or fail response of bodyMassIndex creation
     */
    @GetMapping("")
    public ResponseEntity<CommonResponse> getAllCourseDetails() {
        CommonResponse commonResponse = courseService.getAllCourseDetails();
        return new ResponseEntity<>(commonResponse, HttpStatus.OK);
    }

    /**
     * Get course by course id
     *
     * @param courseId - required data for get course by id
     * @return success or fail response of get course by id
     */
    @GetMapping("/{courseId}")
    public ResponseEntity<CommonResponse> getCourseDetailsById(@PathVariable("courseId") @NotNull Long courseId) {
        CommonResponse commonResponse = courseService.getCourseDetailsById(courseId);
        return new ResponseEntity<>(commonResponse, HttpStatus.OK);
    }

    /**
     * Create course
     *
     * @param courseDTO - required data for course save
     * @return success or fail response of course save
     */
    @PostMapping("")
    public ResponseEntity<CommonResponse> saveCourse(@Valid @RequestBody CourseDTO courseDTO) {
        CommonResponse commonResponse = courseService.saveCourse(courseDTO);
        return new ResponseEntity<>(commonResponse, HttpStatus.OK);
    }

    /**
     * Update course
     *
     * @param courseDTO - required data for course update
     * @return success or fail response of course update
     */
    @PutMapping("")
    public ResponseEntity<CommonResponse> updateCourse(@Valid @RequestBody CourseDTO courseDTO) {
        CommonResponse commonResponse = courseService.updateCourse(courseDTO);
        return new ResponseEntity<>(commonResponse, HttpStatus.OK);
    }

    /**
     * Delete course by id
     *
     * @param courseId - required data for delete course by id
     * @return success or fail response of delete course by id
     */
    @DeleteMapping("/{courseId}")
    public ResponseEntity<CommonResponse> deleteCourseDetailsById(@PathVariable("courseId") @NotNull Long courseId) {
        CommonResponse commonResponse = courseService.deleteCourseDetailsById(courseId);
        return new ResponseEntity<>(commonResponse, HttpStatus.OK);
    }

    /**
     * Delete courses
     *
     * @return success or fail response of delete courses
     */
    @DeleteMapping("")
    public ResponseEntity<CommonResponse> deleteCourses() {
        CommonResponse commonResponse = courseService.deleteCourses();
        return new ResponseEntity<>(commonResponse, HttpStatus.OK);
    }

}
