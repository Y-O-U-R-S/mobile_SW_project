// package com.example.Onyang.controller;

// import com.example.Onyang.service.S3ImageService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;
// import org.springframework.web.multipart.MultipartFile;

// import java.net.URLDecoder;
// import java.util.Base64;
// import java.util.List;

// @RestController
// @RequestMapping("/image")
// @CrossOrigin(origins = "http://localhost:3000")
// public class S3ImageController {

//     @Autowired
//     private S3ImageService s3ImageService;

//     @PostMapping("/uploadImages")
//     public ResponseEntity<List<String>> uploadImages(@RequestParam("images") List<MultipartFile> images) {
//         try {
//             List<String> imageUrls = s3ImageService.uploadMultiple(images);
//             return ResponseEntity.ok(imageUrls);
//         } catch (RuntimeException e) {
//             e.printStackTrace();
//             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//         }
//     }

//     @GetMapping("/getImage/{imageName}")
//     public ResponseEntity<String> getImage(@PathVariable String imageName) {
//         try {
//             byte[] imageData = s3ImageService.getImage(imageName);
//             String imageBase64 = Base64.getEncoder().encodeToString(imageData);
//             String imageHtml = "<img src=\"data:image/jpeg;base64," + imageBase64 + "\"/>";
//             return ResponseEntity.ok().body(imageHtml);
//         } catch (Exception e) {
//             e.printStackTrace();
//             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//         }
//     }

//     @GetMapping("/getImageName")
//     public ResponseEntity<String> getImageName(@RequestParam("imageUrl") String imageUrl) {
//         try {
//             String imageName = getImageNameFromUrl(imageUrl);
//             return ResponseEntity.ok().body(imageName);
//         } catch (Exception e) {
//             e.printStackTrace();
//             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//         }
//     }

//     private String getImageNameFromUrl(String imageUrl) {
//         try {
//             java.net.URL url = new java.net.URL(imageUrl);
//             String decodingKey = URLDecoder.decode(url.getPath(), "UTF-8");
//             return decodingKey.substring(1);
//         } catch (Exception e) {
//             throw new RuntimeException("해당 URL에 이미지가 존재하지 않음");
//         }
//     }
// }
