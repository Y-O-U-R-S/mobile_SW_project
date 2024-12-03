package com.example.Onyang.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

// JPA 엔티티임을 나타내서 데이터베이스의 테이블과 매핑되는 클래스임을 설정
@Entity

// 이 엔티티가 매피될 테이블의 이름을 지정
@Table(name = "\"user\"")
// Lombok이 제공하는 어노테이션

@Data
public class User {
    // 이 필드가 엔티티의 기본 키임을 나타냄(고유 식별자)
    @Id
    private String id; 
    private String name;
    private String email;
    private String password;
    private String address;
    private String phone;
    private String birth;
    private String job;
}