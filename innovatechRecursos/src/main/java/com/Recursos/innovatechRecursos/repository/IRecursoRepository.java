package com.Recursos.innovatechRecursos.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.Recursos.innovatechRecursos.model.Recurso;

@Repository
public interface IRecursoRepository extends JpaRepository<Recurso, Long> {
    // Esto permitirá buscar por "Disponible", "Asignado", etc.
    List<Recurso> findByEstado(String estado);
}