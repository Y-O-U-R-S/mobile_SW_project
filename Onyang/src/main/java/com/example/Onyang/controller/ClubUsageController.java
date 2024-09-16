package com.example.Onyang.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Onyang.model.ClubUsage;
import com.example.Onyang.service.ClubRoomService;
import com.example.Onyang.service.ClubUsageService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/clubUsage")
public class ClubUsageController {
    @Autowired
    private ClubUsageService clubUsageService;
    @Autowired
    private ClubRoomService clubRoomService;

    @PostMapping("/apply")
    public String applyUsage(@ModelAttribute ClubUsage usage) {
        clubUsageService.rentRoom(usage);
        clubRoomService.updateRoomValidity(usage.getClubRoom().getId(), false);
        return "redirect:/usage/confirmation";
    }
}
