package com.example.Onyang.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Onyang.model.ClubRoom;
import com.example.Onyang.service.ClubRoomService;

import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/clubRoom")
public class ClubRoomController {

    @Autowired
    private ClubRoomService clubRoomService;

    @GetMapping
    public List<ClubRoom> getAllUsages() {
        return clubRoomService.getAllRooms();
    }

    // 처음에 동아리방 등록
    @PostMapping("/register")
    public ResponseEntity<String> registerRoom(@ModelAttribute ClubRoom room) {
        clubRoomService.addRoom(room);
        return new ResponseEntity<>("Usage applied successfully", HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable int id) {
        try {
            ClubRoom clubRoom = clubRoomService.findById(id);
            if (clubRoom != null) {
                return ResponseEntity.ok(clubRoom);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("조회 실패: " + e.getMessage());
        }
    }

}
