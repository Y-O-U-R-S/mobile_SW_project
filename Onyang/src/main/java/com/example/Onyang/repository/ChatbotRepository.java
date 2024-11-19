package com.example.Onyang.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Onyang.model.Chatbot;

@Repository
public interface ChatbotRepository extends JpaRepository<Chatbot, Integer>{

    
} 
