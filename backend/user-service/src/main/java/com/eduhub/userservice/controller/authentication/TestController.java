package com.eduhub.userservice.controller.authentication;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {
	@GetMapping("/all")
	public String allAccess() {
		return "Public Content.";
	}
	
	@GetMapping("/learner")
	@PreAuthorize("hasRole('ROLE_LEARNER')")
	public String userAccess() {
		return "Learner Content.";
	}

	@GetMapping("/instructor")
	@PreAuthorize("hasRole('ROLE_INSTRUCTOR')")
	public String moderatorAccess() {
		return "Instructor Board.";
	}

	@GetMapping("/admin")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public String adminAccess() {
		return "Admin Board.";
	}
}
