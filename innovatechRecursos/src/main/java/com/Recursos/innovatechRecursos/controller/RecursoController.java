package com.Recursos.innovatechRecursos.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Recursos.innovatechRecursos.model.Recurso;
import com.Recursos.innovatechRecursos.model.Equipo;
import com.Recursos.innovatechRecursos.service.RecursoService;

@RestController
@RequestMapping("/api/resources")
@CrossOrigin(origins = "*")
public class RecursoController {

    @Autowired
    private RecursoService service;

    // --- ENDPOINTS DE RECURSOS ---

    @GetMapping
    public List<Recurso> listarTodo() { 
        return service.listarTodo(); 
    }

    @GetMapping("/{id}")
    public Recurso obtenerPorId(@PathVariable Long id) {
        return service.obtenerPorId(id);
    }

    @PostMapping
    public Recurso guardar(@RequestBody Recurso r) { 
        return service.guardar(r); 
    }

    @PutMapping("/{id}")
    public Recurso actualizar(@PathVariable Long id, @RequestBody Recurso r) {
        return service.actualizarRecurso(id, r);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminarRecurso(id);
    }

    @GetMapping("/disponibles")
    public List<Recurso> listarDisponibles() {
        return service.listarPorEstado("Disponible");
    }

    // --- ENDPOINTS DE EQUIPOS ---

    @GetMapping("/equipos")
    public List<Equipo> listarEquipos() {
        return service.listarEquipos();
    }

    @PostMapping("/equipos")
    public Equipo guardarEquipo(@RequestBody Equipo e) {
        return service.guardarEquipo(e);
    }
}