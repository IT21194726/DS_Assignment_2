package com.eduhub.learnerservice.repository;

import com.eduhub.learnerservice.entity.LearnerHasUserInformation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LearnerHasUserInformationRepository extends JpaRepository<LearnerHasUserInformation, Long> {
}
