package com.sita.kpi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = "com.sita.kpi.*")
@EnableJpaRepositories("com.sita.kpi.repository")
@EntityScan(basePackages = "com.sita.kpi.entity")
public class ServiceKpiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServiceKpiApplication.class, args);
	}

}
