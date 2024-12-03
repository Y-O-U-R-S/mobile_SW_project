package com.example.Onyang.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Onyang.model.Chatbot;
import com.example.Onyang.repository.ChatbotRepository;

@Service
public class ChatbotService {

    @Autowired
    private ChatbotRepository chatbotRepository;

    public List<Chatbot> findByEmail(String email) {
        return chatbotRepository.findByEmail(email);
    }

    public Chatbot addChat(Chatbot chatbot) {
        chatbot.setDate(LocalDateTime.now());
        return chatbotRepository.save(chatbot);
    }
}
