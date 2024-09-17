package com.example.Onyang.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.example.Onyang.model.User;
import com.example.Onyang.service.UserService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping
    public ResponseEntity<?> addUser(@RequestBody User userDto) {
        if (userService.existsById(userDto.getId())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 사용 중인 아이디");
        }
        User savedUser = userService.addUser(userDto);
        return ResponseEntity.ok(savedUser);
    }

    @GetMapping("/checkId/{id}")
    public ResponseEntity<Boolean> checkIdAvailability(@PathVariable String id) {
        boolean exists = userService.existsById(id);
        return ResponseEntity.ok(!exists);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteUser(@PathVariable String id) {
        boolean deleted = userService.deleteUserById(id);
        if (!deleted) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "존재하지 않는 아이디");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User userDto) {
        boolean authenticated = userService.authenticateUser(userDto.getId(), userDto.getPassword());
        if (authenticated) {
            User authenticatedUser = userService.findById(userDto.getId());
            return ResponseEntity.ok()
                    .body("로그인 가능. 사용자 권한: " + (authenticatedUser.isMaster() ? "회장" : "일반 사용자"));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 불가능");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable String id, @RequestBody User userDto) {
        if (!userService.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("존재하지 않는 아이디");
        }
        User updatedUser = userService.updateUser(id, userDto);
        return ResponseEntity.ok(updatedUser);
    }
}

// userDto json 예시
// {
// "id": "tempId",
// "name": "tempName",
// "password": "tempPW",
// "school" : "sunmoon"
// "stuNum" : "2020243001"
// "phone": "01034445792",
// "gender" : "M"
// "club": "ABC",
// "master" : false
// "caution": 0
// }