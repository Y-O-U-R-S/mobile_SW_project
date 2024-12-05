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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.example.Onyang.model.RentalSpace;
import com.example.Onyang.service.RentalSpaceService;
import com.example.Onyang.service.S3ImageService;

import org.springframework.web.bind.annotation.GetMapping;

import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/rentalSpaces")
public class RentalSpaceController {
    @Autowired
    private RentalSpaceService rentalSpaceService;

    @Autowired
    private S3ImageService s3ImageService;

    @PostMapping
    public ResponseEntity<?> addRentalSpace(
            @RequestParam("name") String name,
            @RequestParam("area") Float area,
            @RequestParam("price") String price,
            @RequestParam("contact_Number") String contactNumber,
            @RequestParam("address") String address,
            @RequestParam("description") String description,
            @RequestParam("distance_From_Onyang_Station") int distanceFromOnyangStation,
            @RequestParam("imageUrl") MultipartFile imageUrl) {
        try {
            // S3에 이미지 업로드
            String uploadedImageUrl = s3ImageService.upload(imageUrl);

            // RentalSpace 엔티티 생성
            RentalSpace rentalSpace = new RentalSpace();
            rentalSpace.setName(name);
            rentalSpace.setArea(area);
            rentalSpace.setPrice(price);
            rentalSpace.setContactNumber(contactNumber);
            rentalSpace.setAddress(address);
            rentalSpace.setDescription(description);
            rentalSpace.setDistanceFromOnyangStation(distanceFromOnyangStation);
            rentalSpace.setImageUrl(uploadedImageUrl);

            // DB에 저장
            RentalSpace savedRentalSpace = rentalSpaceService.addSpace(rentalSpace);
            return ResponseEntity.ok(savedRentalSpace);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("등록 실패: " + e.getMessage());
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

    // 모든 공간 정보 가져오기
    @GetMapping
    public List<RentalSpace> getAllSpaces() {
        return rentalSpaceService.getAllSpaces();
    }

    // 공간 삭제
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteSpace(@PathVariable int id) {
        boolean deleted = rentalSpaceService.deleteSpace(id);
        if (!deleted) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "삭제 불가");
        }
    }
}
