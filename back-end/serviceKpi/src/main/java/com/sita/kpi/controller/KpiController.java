package com.sita.kpi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sita.kpi.entity.KpiFormula;
import com.sita.kpi.repository.KpiRepository;
import com.sita.kpi.service.KpiService;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/KpiService")
public class KpiController {

	@Autowired
	private KpiRepository repo;
	@Autowired
	private KpiService service;
	
	@GetMapping("/formulaKpi")
	public ResponseEntity<?> getAllKpi(){
		return ResponseEntity.ok(repo.findAll());
	}
	@PostMapping("/formulaKpi")
	public ResponseEntity<?> insertNewKpi(@RequestBody KpiFormula kpi){
		if(repo.existsById(kpi.getName())) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Kpi already exists");
		}
		repo.save(kpi);
		
		return ResponseEntity.ok(kpi);
	}
	@PutMapping("/formulaKpi")
	public ResponseEntity<?> modifyKpi(@RequestBody KpiFormula kpi){
		if(repo.existsById(kpi.getName())) {
			repo.save(kpi);
			return ResponseEntity.ok(kpi);
		}
		return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("kpi not found");
	}
	@DeleteMapping("/formulaKpi")
	public ResponseEntity<?> deleteKpi(@RequestParam String name){
		if(repo.existsById(name)) {
			repo.deleteById(name);
			return ResponseEntity.ok("kpi deleted");
		}
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("kpi not found");
	}
}
