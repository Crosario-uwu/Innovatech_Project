package com.Recursos.innovatechRecursos.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Recursos.innovatechRecursos.model.Recurso;
import com.Recursos.innovatechRecursos.model.Equipo;
import com.Recursos.innovatechRecursos.repository.IRecursoRepository;
import com.Recursos.innovatechRecursos.repository.IEquipoRepository; // Import corregido

@Service
public class RecursoService {
    @Autowired
    private IRecursoRepository repository;

    @Autowired
    private IEquipoRepository equipoRepository;

    public List<Recurso> listarTodo() { return repository.findAll(); }
    
    public Recurso obtenerPorId(Long id) { 
        return repository.findById(id).orElse(null); 
    }

    public Recurso guardar(Recurso r) { return repository.save(r); }

    public Recurso actualizarRecurso(Long id, Recurso r) {
        r.setId(id); // Asegura que actualice el ID correcto
        return repository.save(r);
    }

    public void eliminarRecurso(Long id) {
        repository.deleteById(id);
    }

    public List<Recurso> listarPorEstado(String estado) {
        return repository.findByEstado(estado); 
    }

    public List<Equipo> listarEquipos() {
        return equipoRepository.findAll();
    }

    public Equipo guardarEquipo(Equipo e) {
        return equipoRepository.save(e);
    }
  
}
