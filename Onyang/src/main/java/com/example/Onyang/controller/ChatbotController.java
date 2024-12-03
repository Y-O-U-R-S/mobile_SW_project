package com.example.Onyang.controller;

import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.example.Onyang.model.Chatbot;
import com.example.Onyang.service.ChatbotService;

@RestController
@RequestMapping("/chatbot")
@CrossOrigin(origins = "http://localhost:3000")
public class ChatbotController {

    @Autowired
    private ChatbotService chatbotService;

    @GetMapping("/email/{email}")
    public ResponseEntity<List<Chatbot>> getMessagesByEmail(@PathVariable("email") String email) {
        List<Chatbot> chatbots = chatbotService.findByEmail(email);
        chatbots.sort(Comparator.comparing(Chatbot::getDate)); // 시간 순서대로 정렬
        if (chatbots.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(chatbots);
    }

    // FAQ 추가
    @PostMapping("/add")
    public ResponseEntity<?> addFaq(@RequestBody Chatbot chatbot) {
        try {
            Chatbot addedChatbot = chatbotService.addChat(chatbot);
            return ResponseEntity.ok(addedChatbot);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("추가 실패: " + e.getMessage());
        }
    }
}
