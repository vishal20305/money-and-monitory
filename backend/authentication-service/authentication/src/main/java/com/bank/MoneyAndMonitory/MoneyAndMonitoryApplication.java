package com.bank.MoneyAndMonitory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
@EnableJpaRepositories(basePackages = "com.bank.MoneyAndMonitory.Repository")
public class MoneyAndMonitoryApplication {

	public static void main(String[] args) {

		SpringApplication.run(MoneyAndMonitoryApplication.class, args);

	}


}
