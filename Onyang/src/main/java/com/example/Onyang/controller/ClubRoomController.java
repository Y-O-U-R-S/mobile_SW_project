package com.example.Onyang.controller;

import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping("/register")
    public String registerRoom(@ModelAttribute ClubRoom room) {
        clubRoomService.addRoom(room);
        return "redirect:/rooms";
    }
}
