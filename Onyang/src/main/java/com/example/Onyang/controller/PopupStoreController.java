package com.example.Onyang.controller;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.example.Onyang.model.PopupStore;
import com.example.Onyang.service.PopupStoreService;
import com.example.Onyang.service.S3ImageService;

import java.time.LocalDateTime;
import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/popupStore")
public class PopupStoreController {

    @Autowired
    private PopupStoreService popupStoreService;

    @Autowired
    private S3ImageService s3ImageService;

    // 값 넣기
    // 날짜 값 보낼때 20xx-xx-xxTxx:xx:xx 이 형식으로 보내야함
    @PostMapping
    public ResponseEntity<?> addPopup(@RequestParam("popup_Name") String popup_Name,
            @RequestParam("address") String address,
            @RequestParam("status") String status,
            @RequestParam("start_Date") String _start_Date,
            @RequestParam("end_Date") String _end_Date,
            @RequestParam("description") String description,
            @RequestParam("image") MultipartFile image) {
        try {
            String imageUrl = s3ImageService.upload(image);
            LocalDateTime start_Date = LocalDateTime.parse(_start_Date);
            LocalDateTime end_Date = LocalDateTime.parse(_end_Date);

            PopupStore popupStore = new PopupStore();
            popupStore.setPopup_Name(popup_Name);
            popupStore.setAddress(address);
            popupStore.setStatus(status);
            popupStore.setStart_Date(start_Date);
            popupStore.setEnd_Date(end_Date);
            popupStore.setDescription(description);
            popupStore.setImage(imageUrl);
            PopupStore addPopupStore = popupStoreService.addPopupStore(popupStore);
            return ResponseEntity.ok(addPopupStore);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("실패: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable int id) {
        try {
            PopupStore popupStore = popupStoreService.findById(id);
            if (popupStore != null) {
                return ResponseEntity.ok(popupStore);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("조회 실패: " + e.getMessage());
        }
    }
    
    //전부 가져오기
    @GetMapping
    public List<PopupStore> getAllUsages() {
        return popupStoreService.getAllPopupStores();
    }

    //값 삭제
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deletePopup(@PathVariable int id) {
        boolean deleted = popupStoreService.deletePopup(id);
        if (!deleted) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "삭제 불가");
        }
    }


}
