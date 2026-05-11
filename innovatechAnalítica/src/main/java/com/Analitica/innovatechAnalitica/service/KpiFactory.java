package com.Analitica.innovatechAnalitica.service;

import java.time.LocalDateTime;

import com.Analitica.innovatechAnalitica.model.Analitica;
/* Fábrica de KPIs para crear instancias de Analitica con valores predefinidos o personalizados */
public class KpiFactory {
    public static Analitica crearKpiEstandar(String nombre, Double valor) {
        Analitica kpi = new Analitica();
        kpi.setNombreKpi(nombre);
        kpi.setValorKpi(valor);
        kpi.setFechaCreacion(LocalDateTime.now());
        return kpi;
    }
}