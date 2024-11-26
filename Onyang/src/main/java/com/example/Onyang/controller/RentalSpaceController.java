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
@RequestMapping("/clubUsage")
public class RentalSpaceController {
    @Autowired
    private RentalSpaceService rentalSpaceService;

    @Autowired
    private S3ImageService s3ImageService;

    // 값 넣기
    @PostMapping
    public ResponseEntity<?> addRentalSpace(@RequestParam("name") String _name,
            @RequestParam("area") float area,
            @RequestParam("price") String price,
            @RequestParam("contact_Number") String contact_Number,
            @RequestParam("address") String address,
            @RequestParam("description") String description,
            @RequestParam("imageUrl") MultipartFile _imageUrl,
            @RequestParam("distance_From_Onyang_Station") int distance_From_Onyang_Station
            ) {
        try {
            String imageUrl = s3ImageService.upload(_imageUrl);

            RentalSpace rentalSpace = new RentalSpace();
            rentalSpace.setName(_name);
            rentalSpace.setArea(area);
            rentalSpace.setPrice(price);
            rentalSpace.setContact_Number(contact_Number);
            rentalSpace.setImage_Url(imageUrl);
            rentalSpace.setDescription(description);
            rentalSpace.setAddress(address);
            rentalSpace.setDistance_From_Onyang_Station(distance_From_Onyang_Station);
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