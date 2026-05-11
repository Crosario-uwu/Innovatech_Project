package com.Proyectos.innovatechProject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Proyectos.innovatechProject.model.Proyecto;

/* Repositorio para la entidad Proyecto, extiende JpaRepository para operaciones CRUD */
@Repository
public interface IProyectoRepository extends JpaRepository<Proyecto, Long> {
}