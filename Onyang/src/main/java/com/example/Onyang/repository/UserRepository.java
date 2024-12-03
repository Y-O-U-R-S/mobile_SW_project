package com.example.Onyang.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Onyang.model.User;

// User를 JPA 엔티티로 정의한 후 JPA Repository를 사용하여 CRUD 작업을 수행
@Repository
// JpaRepository<User, String> : 이 Repository는 User 객체를 데이터베이스와 상호작용하는데 사용
// String : User 엔티티의 기본 키의 데이터 타입(id가 String으로 정의되어 있음)
public interface UserRepository extends JpaRepository<User, String> {
}