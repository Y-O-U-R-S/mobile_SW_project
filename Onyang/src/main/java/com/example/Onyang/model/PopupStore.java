package com.example.Onyang.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "\"popup_store\"")
@Data
public class PopupStore {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String popup_Name;
    private String address;
    private String status;
    private LocalDateTime start_Date;
    private LocalDateTime end_Date;
    private String description;
    private String image;
}
