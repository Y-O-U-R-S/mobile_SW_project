package com.example.Onyang.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

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
    
    // 값 넣기
    @PostMapping
    public ResponseEntity<?> addChat(@RequestBody Chatbot chatbot) {
        try {
            Chatbot addChat = chatbotService.addChat(chatbot);
            return ResponseEntity.ok(addChat);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("실패: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable int id) {
        try {
            Chatbot chatbot = chatbotService.findById(id);
            if (chatbot != null) {
                return ResponseEntity.ok(chatbot);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("조회 실패: " + e.getMessage());
        }
    }

    // 값 전부 가져오기
    @GetMapping
    public List<Chatbot> getAllChat() {
        return chatbotService.getAllChat();
    }

    // 값 삭제
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteChat(@PathVariable int id) {
        boolean deleted = chatbotService.deleteChat(id);
        if (!deleted) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "삭제 불가");
        }
    }

}
