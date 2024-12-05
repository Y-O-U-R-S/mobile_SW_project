package com.example.Onyang.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "rental_space") // 테이블 이름은 소문자
@Data
public class RentalSpace {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id; // 자동 증가 설정

    private String name;

    private Float area;

    @Column(name = "contact_number") // 컬럼 이름에 정확히 매핑
    private String contactNumber;

    @Column(name = "imageurl") // 컬럼 이름과 일치
    private String imageUrl;

    private String description;

    private String address;

    @Column(name = "distance_from_onyang_station") // 정확히 매핑
    private int distanceFromOnyangStation;

    private String price;
}
