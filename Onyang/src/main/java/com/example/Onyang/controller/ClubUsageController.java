package com.example.Onyang.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

    // 동아리방 신청
    @PostMapping("/apply")
    public ResponseEntity<String> applyUsage(@ModelAttribute ClubUsage usage) {
        clubUsageService.rentRoom(usage);
        clubRoomService.updateRoomValidity(usage.getClubRoom().getId(), false);
        return new ResponseEntity<>("Usage applied successfully", HttpStatus.CREATED);
    }

    // 동아리방 반납, 청결도 값 가져와서 계산하는 식 필요
    // if clean의 값이 얼마 이상이 아니면 반납 x
    @PostMapping("/return")
    public ResponseEntity<String> returnUsage(@RequestParam int roomId, @RequestParam int clean) {
        clubRoomService.returnRoom(roomId, true, clean);
        return new ResponseEntity<>("Room returned successfully", HttpStatus.OK);
    }

}
/*
 * {
 * "clubName": "Example Club",
 * "school": "Example School",
 * "clubPhone": "123-456-7890",
 * "checkInTime": "2024-09-16T10:30:00",
 * "checkOutTime": "2024-09-16T12:30:00",
 * "masterName": "John Doe",
 * "clubRoom": {
 * "id": 1 // 사용하고자 하는 방의 ID
 * }
 * }
 */