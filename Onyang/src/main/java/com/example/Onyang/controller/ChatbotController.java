package com.example.Onyang.controller;

import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.example.Onyang.model.Chatbot;
import com.example.Onyang.service.ChatbotService;

// CORS 설정 : 특정 출처에서의 요청 허용
@CrossOrigin(origins = "http://localhost:3000")
// RESTful 웹서비스의 컨트롤러, 메소드의 반환 값이 자동으로 JSON 형식으로 변환됨
@RestController
// 이 클래스의 모든 메소드가 /chatbot 경로로 시작하는 HTTP 요청을 처리하도록 설정
@RequestMapping("/chatbot")
public class ChatbotController {

    // 의존성 주입 chatbotservice 인스턴스를 주입하여 서비스 로직 호출
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
