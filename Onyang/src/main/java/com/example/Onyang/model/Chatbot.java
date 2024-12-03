package com.example.Onyang.model;

import java.time.LocalDateTime;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "\"faq\"")
@Data
public class Chatbot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 자동 생성 기본 키
    private int id; // 고유 식별자 추가

    private String question;
    private String answer;
    private String email;
    private LocalDateTime date;
}
