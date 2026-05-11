package com.Proyectos.innovatechProject.controller;

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

import com.Proyectos.innovatechProject.model.Cliente;
import com.Proyectos.innovatechProject.model.Proyecto;
import com.Proyectos.innovatechProject.service.ProyectoService;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "*")
public class ProyectoController {

    @Autowired
    private ProyectoService service;

    // --- ENDPOINTS PROYECTOS ---
    @GetMapping
    public List<Proyecto> listar() { return service.obtenerTodos(); }

    @GetMapping("/{id}")
    public Proyecto obtener(@PathVariable Long id) { return service.obtenerPorId(id); }

    @PostMapping
    public Proyecto guardar(@RequestBody Proyecto proyecto) { return service.guardar(proyecto); }

    @PutMapping("/{id}")
    public Proyecto actualizar(@PathVariable Long id, @RequestBody Proyecto proyecto) {
        proyecto.setId(id);
        return service.guardar(proyecto);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) { service.eliminar(id); }

    // --- ENDPOINTS CLIENTES ---
    @GetMapping("/clientes")
    public List<Cliente> listarClientes() { return service.obtenerClientes(); }

    @GetMapping("/clientes/{id}")
    public Cliente obtenerCliente(@PathVariable Long id) { return service.obtenerClientePorId(id); }

    @PostMapping("/clientes")
    public Cliente guardarCliente(@RequestBody Cliente cliente) { return service.guardarCliente(cliente); }

    @PutMapping("/clientes/{id}")
    public Cliente actualizarCliente(@PathVariable Long id, @RequestBody Cliente cliente) {
        cliente.setId(id);
        return service.guardarCliente(cliente);
    }

    @DeleteMapping("/clientes/{id}")
    public void eliminarCliente(@PathVariable Long id) { service.eliminarCliente(id); }
}