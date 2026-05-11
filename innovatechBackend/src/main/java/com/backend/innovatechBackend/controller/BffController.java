package com.backend.innovatechBackend.controller;


import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/bff")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class BffController {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${url.proyectos}")
    private String urlProyectos; // http://localhost:8081/api/projects
    
    @Value("${url.recursos}")
    private String urlRecursos; // http://localhost:8082/api/resources
    
    @Value("${url.analitica}")
    private String urlAnalitica; // http://localhost:8083/api/analytics
    
@GetMapping("/dashboard")
public Map<String, Object> getDashboard() {
    Map<String, Object> response = new HashMap<>();
    try {
        // Usamos las URLs base definidas en properties
        // Esto llamará a: http://localhost:8083/api/analytics/dashboard/resumen
        Object resumen = restTemplate.getForObject(urlAnalitica + "/dashboard/resumen", Object.class);
        
        // Esto llamará a: http://localhost:8081/api/projects
        Object proyectos = restTemplate.getForObject(urlProyectos, Object.class);

        response.put("resumen", resumen);
        response.put("proyectos", proyectos);
    } catch (RestClientException e) {
        response.put("error", "Error conectando con microservicios: " + e.getMessage());
    }
    return response;
}
    
    // --- PROYECTOS ---
    @GetMapping("/proyectos")
    public Object listarProyectos() { return restTemplate.getForObject(urlProyectos, Object.class); }

    @GetMapping("/proyectos/{id}")
    public Object obtenerProyecto(@PathVariable Long id) {
        return restTemplate.getForObject(urlProyectos + "/" + id, Object.class);
    }

    @PostMapping("/proyectos")
    public Object guardarProyecto(@RequestBody Object proyecto) {
        return restTemplate.postForObject(urlProyectos, proyecto, Object.class);
    }

    @PutMapping("/proyectos/{id}")
    public Object actualizarProyecto(@PathVariable Long id, @RequestBody Object proyecto) {
        restTemplate.put(urlProyectos + "/" + id, proyecto);
        return restTemplate.getForObject(urlProyectos + "/" + id, Object.class);
    }

    @DeleteMapping("/proyectos/{id}")
    public void eliminarProyecto(@PathVariable Long id) {
        restTemplate.delete(urlProyectos + "/" + id);
    }

    // --- RECURSOS ---
    @GetMapping("/recursos")
    public Object listarRecursos() { return restTemplate.getForObject(urlRecursos, Object.class); }

    @GetMapping("/recursos/{id}")
    public Object obtenerRecurso(@PathVariable Long id) {
        return restTemplate.getForObject(urlRecursos + "/" + id, Object.class);
    }

    @PostMapping("/recursos")
    public Object guardarRecurso(@RequestBody Object recurso) {
        return restTemplate.postForObject(urlRecursos, recurso, Object.class);
    }

    @PutMapping("/recursos/{id}")
    public Object actualizarRecurso(@PathVariable Long id, @RequestBody Object recurso) {
        restTemplate.put(urlRecursos + "/" + id, recurso);
        return restTemplate.getForObject(urlRecursos + "/" + id, Object.class);
    }

    @DeleteMapping("/recursos/{id}")
    public void eliminarRecurso(@PathVariable Long id) {
        restTemplate.delete(urlRecursos + "/" + id);
    }

    // --- CLIENTES ---
    @GetMapping("/clientes")
    public Object listarClientes() {
        return restTemplate.getForObject(urlProyectos + "/clientes", Object.class);
    }

    @GetMapping("/clientes/{id}")
    public Object obtenerCliente(@PathVariable Long id) {
        return restTemplate.getForObject(urlProyectos + "/clientes/" + id, Object.class);
    }

    @PostMapping("/clientes")
    public Object guardarCliente(@RequestBody Object cliente) {
        return restTemplate.postForObject(urlProyectos + "/clientes", cliente, Object.class);
    }

    @PutMapping("/clientes/{id}")
    public Object actualizarCliente(@PathVariable Long id, @RequestBody Object cliente) {
        restTemplate.put(urlProyectos + "/clientes/" + id, cliente);
        return restTemplate.getForObject(urlProyectos + "/clientes/" + id, Object.class);
    }

    @DeleteMapping("/clientes/{id}")
    public void eliminarCliente(@PathVariable Long id) {
        restTemplate.delete(urlProyectos + "/clientes/" + id);
    }

    // --- ANALÍTICA ---
    @GetMapping("/analytics/kpis")
    public Object getKpis() {
        return restTemplate.getForObject(urlAnalitica + "/kpis", Object.class);
    }

    @GetMapping("/analytics/reportes")
    public Object getReportes() {
        return restTemplate.getForObject(urlAnalitica + "/reportes", Object.class);
    }

}