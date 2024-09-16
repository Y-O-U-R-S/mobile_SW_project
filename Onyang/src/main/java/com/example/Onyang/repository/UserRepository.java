package com.example.Onyang.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Onyang.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
}