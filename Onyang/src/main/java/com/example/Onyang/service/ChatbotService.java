package com.example.Onyang.service;

import java.time.LocalDateTime;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Onyang.model.Chatbot;
import com.example.Onyang.repository.ChatbotRepository;

@Service
public class ChatbotService {

    @Autowired
    private ChatbotRepository chatbotRepository;

    public List<Chatbot> getAllChat() {
        return chatbotRepository.findAll();
    }

    // 챗봇에 질문한 내용 db에 추가
    public Chatbot addChat(Chatbot chatbot) {
        chatbot.setDate(LocalDateTime.now());
        return chatbotRepository.save(chatbot);
    }

    public boolean deleteChat(int id) {
        try{
            chatbotRepository.deleteById(id);
            return true;
        } catch(Exception e){
            return false;
        }
    }

    public Chatbot findById(int id) {
        Optional<Chatbot> chatbot = chatbotRepository.findById(id);
        return chatbot.orElse(null);
    }

}
