package com.eduhub.userservice.repository.authentication;


import com.eduhub.userservice.entity.authentication.ERole;
import com.eduhub.userservice.entity.authentication.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
