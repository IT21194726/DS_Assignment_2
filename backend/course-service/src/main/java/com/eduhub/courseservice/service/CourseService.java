package com.eduhub.courseservice.service;

import com.eduhub.courseservice.common.CommonResponse;
import com.eduhub.courseservice.dto.CourseDTO;

public interface CourseService {
    /**
     * Get all course
     *
     * @return success or fail response of bodyMassIndex creation
     */
    CommonResponse getAllCourseDetails();

    /**
     * Get course by course id
     *
     * @param courseId - required data for get course by id
     * @return success or fail response of get course by id
     */
    CommonResponse getCourseDetailsById(Long courseId);

    /**
     * Create course
     *
     * @param courseDTO - required data for course save
     * @return success or fail response of course save
     */
    CommonResponse saveCourse(CourseDTO courseDTO);

    /**
     * Update course
     *
     * @param courseDTO - required data for course update
     * @return success or fail response of course update
     */
    CommonResponse updateCourse(CourseDTO courseDTO);

    /**
     * Delete course by id
     *
     * @param courseId - required data for delete course by id
     * @return success or fail response of delete course by id
     */
    CommonResponse deleteCourseDetailsById(Long courseId);

    /**
     * Delete courses
     *
     * @return success or fail response of delete courses
     */
    CommonResponse deleteCourses();
}
