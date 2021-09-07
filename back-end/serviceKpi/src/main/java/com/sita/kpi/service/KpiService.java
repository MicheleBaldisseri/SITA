package com.sita.kpi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sita.kpi.entity.KpiFormula;
import com.sita.kpi.repository.KpiRepository;

@Service
public class KpiService {

	@Autowired
	private KpiRepository repo;
	
	private KpiFormula kpi;
	
	public boolean checkExistsKpi(KpiFormula kpi) {
		return (repo.existsById(kpi.getName()))?true:false;
	}
}
