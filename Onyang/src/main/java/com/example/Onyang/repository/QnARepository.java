package com.example.Onyang.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Onyang.model.QnA;

@Repository
public interface QnARepository extends JpaRepository<QnA, Integer>{

    
} 
