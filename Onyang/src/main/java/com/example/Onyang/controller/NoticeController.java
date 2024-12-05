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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Onyang.model.Notice;
import com.example.Onyang.service.NoticeService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/notice")
public class NoticeController {

    @Autowired
    private NoticeService noticeService;

    @PostMapping
    public ResponseEntity<?> addNotice(@RequestBody Notice notice) {
        try {
            Notice addNotice = noticeService.addNotice(notice);
            return ResponseEntity.ok(addNotice);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("실패: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable int id) {
        try {
            Notice notice = noticeService.findById(id);
            if (notice != null) {
                return ResponseEntity.ok(notice);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("조회 실패: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Notice>> getAllNotices() {
        try {
            List<Notice> notices = noticeService.getAllNotices();
            return ResponseEntity.ok(notices);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateNotice(@PathVariable("id") int id, @RequestBody Notice notice) {
        try {
            Notice updatedNotice = noticeService.updateNotice(id, notice);
            if (updatedNotice != null) {
                return ResponseEntity.ok(updatedNotice);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Notice not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Update failed: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNotice(@PathVariable("id") int id) {
        try {
            noticeService.deleteNoticeById(id);
            return ResponseEntity.ok().body("삭제 성공");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("삭제 실패: " + e.getMessage());
        }
    }

}
