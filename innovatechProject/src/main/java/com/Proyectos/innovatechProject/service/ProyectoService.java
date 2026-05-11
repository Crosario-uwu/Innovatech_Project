package com.Proyectos.innovatechProject.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Proyectos.innovatechProject.model.Proyecto;
import com.Proyectos.innovatechProject.repository.IProyectoRepository;
import com.Proyectos.innovatechProject.model.Cliente;
import com.Proyectos.innovatechProject.repository.IClienteRepository;

@Service
public class ProyectoService {

    @Autowired
    private IProyectoRepository repository;

    @Autowired
    private IClienteRepository clienteRepository;

    // --- LÓGICA DE PROYECTOS ---
    public List<Proyecto> obtenerTodos() { return repository.findAll(); }

    public Proyecto obtenerPorId(Long id) { return repository.findById(id).orElse(null); }

    public Proyecto guardar(Proyecto proyecto) { return repository.save(proyecto); }

    public void eliminar(Long id) { repository.deleteById(id); }

    // --- LÓGICA DE CLIENTES ---
    public List<Cliente> obtenerClientes() { return clienteRepository.findAll(); }
    
    public Cliente obtenerClientePorId(Long id) { return clienteRepository.findById(id).orElse(null); }

    public Cliente guardarCliente(Cliente cliente) { return clienteRepository.save(cliente); }

    public void eliminarCliente(Long id) { clienteRepository.deleteById(id); }
}