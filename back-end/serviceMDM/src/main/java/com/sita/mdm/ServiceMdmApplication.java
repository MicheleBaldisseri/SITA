package com.sita.mdm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = "com.sita.mdm.*")
@EnableJpaRepositories("com.sita.mdm.repository")
@EntityScan(basePackages = "com.sita.mdm.entity")
public class ServiceMdmApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServiceMdmApplication.class, args);
	}

}
