package com.sita.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sita.user.entity.Users;

public interface UserRepository extends JpaRepository<Users, String> {
	public Users findUsersByEmail(String email);
	
	public boolean existsUsersByEmail(String email);
	
	public boolean existsUsersByEmailAndPassword(String email, String password);
}
