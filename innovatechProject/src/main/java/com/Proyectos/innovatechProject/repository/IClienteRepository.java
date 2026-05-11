package com.Proyectos.innovatechProject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.Proyectos.innovatechProject.model.Cliente;

@Repository
public interface IClienteRepository extends JpaRepository<Cliente, Long> {
}