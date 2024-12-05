package com.example.Onyang.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "\"notice\"")
@Data
public class Notice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id; // 식별번호

    private String title; // 공지사항 제목
    private String detail; // 공지사항 내용
    private LocalDateTime date; // 날짜

}
