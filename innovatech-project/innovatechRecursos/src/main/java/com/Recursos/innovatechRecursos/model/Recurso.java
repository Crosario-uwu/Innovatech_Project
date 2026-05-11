package com.Recursos.innovatechRecursos.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Recurso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nombreRecurso; // Ej: "Servidor AWS", "Licencia Java" Nombre del recurso
    private String tipo;          // Ej: "Hardware", "Software" Categoría del recurso
    private Integer cantidad;
    // Agrega estos campos a tu clase existente
private String rol;    // Ej: "Developer", "Designer", "Manager"
private String estado; // Ej: "Disponible", "Asignado", "Licencia"
private String email;  // Para el contacto en el panel de equipos
}