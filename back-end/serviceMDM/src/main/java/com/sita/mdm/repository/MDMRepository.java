package com.sita.mdm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sita.mdm.entity.KpiElement;

@Repository
public interface MDMRepository extends JpaRepository<KpiElement,String> {
}
