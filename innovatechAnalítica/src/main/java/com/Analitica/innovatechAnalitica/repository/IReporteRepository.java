package com.Analitica.innovatechAnalitica.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Analitica.innovatechAnalitica.model.Reporte;

@Repository
public interface IReporteRepository extends JpaRepository<Reporte, Long> {
}