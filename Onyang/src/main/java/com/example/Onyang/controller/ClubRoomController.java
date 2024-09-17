package com.example.Onyang.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Onyang.model.ClubRoom;
import com.example.Onyang.service.ClubRoomService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/clubRoom")
public class ClubRoomController {
    
    @Autowired
    private ClubRoomService clubRoomService;

    //처음에 동아리방 등록
    @PostMapping("/register")
    public ResponseEntity<String> registerRoom(@ModelAttribute ClubRoom room) {
        clubRoomService.addRoom(room);
        return new ResponseEntity<>("Usage applied successfully", HttpStatus.CREATED);
    }
}
