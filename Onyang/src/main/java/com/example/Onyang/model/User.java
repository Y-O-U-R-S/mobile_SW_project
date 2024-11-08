package com.example.Onyang.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "\"users\"")
@Data
public class User {
    @Id
    private String id; 
    private String password;
    private String name;
    private String email;
    private String address;
    private String phone;
    private String birth;
    private String job;
}