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
    private String school; //학교명
    private String club; //동아리명
    private String stunum; //학번
    private String phone; //전화번호
    private boolean master; //회장 여부
    private String gender;
    private int caution; //경고 횟수
}