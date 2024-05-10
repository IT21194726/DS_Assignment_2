package com.spring.childhealthcare.repository.authentication;


import com.spring.childhealthcare.entity.authentication.ERole;
import com.spring.childhealthcare.entity.authentication.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
