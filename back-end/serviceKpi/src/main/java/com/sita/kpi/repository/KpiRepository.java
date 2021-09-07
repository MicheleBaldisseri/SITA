package com.sita.kpi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sita.kpi.entity.KpiFormula;

@Repository
public interface KpiRepository extends JpaRepository<KpiFormula, String>{
	public boolean existsKpiFormulaByName(String name);
}
