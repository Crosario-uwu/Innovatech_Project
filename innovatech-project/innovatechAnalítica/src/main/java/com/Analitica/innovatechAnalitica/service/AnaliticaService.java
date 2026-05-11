package com.Analitica.innovatechAnalitica.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Analitica.innovatechAnalitica.model.Analitica;
import com.Analitica.innovatechAnalitica.model.DashboardResumen;
import com.Analitica.innovatechAnalitica.model.Reporte;
import com.Analitica.innovatechAnalitica.repository.IAnaliticaRepository;
import com.Analitica.innovatechAnalitica.repository.IReporteRepository;

@Service
public class AnaliticaService {

    @Autowired
    private IAnaliticaRepository repository;
    
    @Autowired
    private IReporteRepository reporteRepository;

    // Métodos para KPIs (Analitica)
    public List<Analitica> obtenerTodosLosKpis() { return repository.findAll(); }
    public Analitica guardarKpi(Analitica kpi) { return repository.save(kpi); }

    // Métodos para Reportes
    public List<Reporte> obtenerReportes() { return reporteRepository.findAll(); }
    public Reporte guardarReporte(Reporte r) { return reporteRepository.save(r); }

    // Lógica para alimentar el Dashboard (Valores estáticos para la demo o dinámicos)
    public DashboardResumen obtenerResumen() {
        DashboardResumen resumen = new DashboardResumen();
        resumen.setTotalProyectos(24);
        resumen.setProyectosCompletados(18);
        resumen.setProyectosEnEspera(6);
        resumen.setPresupuestoTotal(12500000.0);
        return resumen;
    }
}