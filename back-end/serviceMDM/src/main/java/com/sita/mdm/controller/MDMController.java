package com.sita.mdm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sita.mdm.repository.MDMRepository;

@RestController
@RequestMapping("/MDMService")
@CrossOrigin(origins = "*")
public class MDMController {

	@Autowired
	private MDMRepository repo;
	
	@GetMapping("/getAllElements")
	public ResponseEntity<?> getAllElements(){
		try {
			return ResponseEntity.ok(repo.findAll());
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
}
