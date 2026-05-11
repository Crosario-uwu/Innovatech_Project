package com.Analitica.innovatechAnalitica.model;

import lombok.Data;

@Data
public class DashboardResumen {
    private long totalProyectos;
    private long proyectosCompletados;
    private long proyectosEnEspera;
    private double presupuestoTotal;
}