package com.example.Onyang.model;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "\"club_usage\"")
@Data
public class ClubUsage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String clubName;
    private String school;
    private String clubPhone;
    private LocalDateTime checkInTime;
    private LocalDateTime checkOutTime;
    private String masterName;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private ClubRoom clubRoom;

}
