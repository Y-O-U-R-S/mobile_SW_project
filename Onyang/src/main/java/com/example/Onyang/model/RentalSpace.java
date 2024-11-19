package com.example.Onyang.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "\"rental_space\"")
@Data
public class RentalSpace {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private Float area;
    private String contactNumber;
    private String imageUrl;
    private String description;
    private String address;
    private int distanceFromStation;
    private String price;
}
