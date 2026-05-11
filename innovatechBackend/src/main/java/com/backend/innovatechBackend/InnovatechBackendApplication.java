package com.backend.innovatechBackend;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration; // Importa esto

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class}) // <--- Añade esto
public class InnovatechBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(InnovatechBackendApplication.class, args);
    }
}