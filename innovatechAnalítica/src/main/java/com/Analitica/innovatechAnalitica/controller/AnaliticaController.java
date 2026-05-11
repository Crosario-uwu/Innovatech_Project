package com.Analitica.innovatechAnalitica.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Analitica.innovatechAnalitica.model.Analitica;
import com.Analitica.innovatechAnalitica.model.DashboardResumen;
import com.Analitica.innovatechAnalitica.model.Reporte;
import com.Analitica.innovatechAnalitica.service.AnaliticaService;

/* Controlador REST para manejar las solicitudes relacionadas con la analítica */
@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "*") // Para que el Front pueda conectar sin problemas de CORS
public class AnaliticaController {

    @Autowired
    private AnaliticaService service;


    @PostMapping("/guardar")
    public Analitica guardar(@RequestBody Analitica kpi) {
        return service.guardarKpi(kpi);
    }
    // --- KPIs ---
    @GetMapping("/kpis")
    public List<Analitica> listarKpis() {
        return service.obtenerTodosLosKpis();
    }

    // --- DASHBOARD RESUMEN ---
    @GetMapping("/dashboard/resumen")
    public DashboardResumen obtenerResumen() {
        return service.obtenerResumen();
    }

    // --- REPORTES ---
    @GetMapping("/reportes")
    public List<Reporte> listarReportes() {
        return service.obtenerReportes();
    }
    
    @PostMapping("/reportes")
    public Reporte crearReporte(@RequestBody Reporte reporte) {
        return service.guardarReporte(reporte);
    }
}