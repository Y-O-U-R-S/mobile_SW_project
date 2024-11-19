package com.example.Onyang.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.Onyang.model.RentalSpace;
import com.example.Onyang.service.RentalSpaceService;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/clubUsage")
public class RentalSpaceController {
    @Autowired
    private RentalSpaceService rentalSpaceService;

    // 값 넣기
    @PostMapping
    public ResponseEntity<?> addRentalSpace(@RequestBody RentalSpace rentalSpace) {
        try {
            RentalSpace addRentalSpace = rentalSpaceService.addSpace(rentalSpace);
            return ResponseEntity.ok(addRentalSpace);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("실패: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable int id) {
        try {
            RentalSpace rentalSpace = rentalSpaceService.findById(id);
            if (rentalSpace != null) {
                return ResponseEntity.ok(rentalSpace);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("조회 실패: " + e.getMessage());
        }
    }

    // 값 전부 가져오기
    @GetMapping
    public List<RentalSpace> getAllUsages() {
        return rentalSpaceService.getAllSpaces();
    }

    // 값 삭제
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteSpace(@PathVariable int id) {
        boolean deleted = rentalSpaceService.deleteSpace(id);
        if (!deleted) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "삭제 불가");
        }
    }

}