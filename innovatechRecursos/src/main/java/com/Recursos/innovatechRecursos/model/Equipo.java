package com.Recursos.innovatechRecursos.model;


import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data
public class Equipo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nombreEquipo; // Ej: "Equipo de Desarrollo IA"
    private String especialidad; // Ej: "Backend", "Data Science"
    
    // Relación: Un equipo tiene muchos recursos
    @OneToMany
    @JoinColumn(name = "equipo_id")
    private List<Recurso> integrantes;
}