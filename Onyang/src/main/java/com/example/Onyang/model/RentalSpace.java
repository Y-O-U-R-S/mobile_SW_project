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
    private String contact_Number;
    private String image_Url;
    private String description;
    private String address;
    private int distance_From_Onyang_Station;
    private String price;
}
