package com.example.Onyang.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.example.Onyang.model.User;
import com.example.Onyang.service.UserService;

import java.util.List;
import java.util.Map;

// CORS 설정 : 특정 출처에서의 요청 허용
@CrossOrigin(origins = "http://localhost:3000")
// RESTful 웹서비스의 컨트롤러, 메소드의 반환 값이 자동으로 JSON 형식으로 변환됨
@RestController
// 이 클래스의 모든 메소드가 /user 경로로 시작하는 HTTP 요청을 처리하도록 설정
@RequestMapping("/user")
public class UserController {

    // 의존성 주입 userService 인스턴스를 주입하여 서비스 로직 호출
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
            // User authenticatedUser = userService.findById(userDto.getId());
            return ResponseEntity.ok()
                    .body("로그인 가능.");
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

    @GetMapping("/find")
    public ResponseEntity<?> findById(@RequestParam("email") String email) {
        try {
            User user = userService.findById(email);
            if (user != null) {
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("조회 실패: " + e.getMessage());
        }
    }

    // 사용자 찾기 컨트롤러
    @PostMapping("/find-user")
    public ResponseEntity<?> findUserByEmailAndName(@RequestBody User userDto) {
        User user = userService.findByEmailAndName(userDto.getId(), userDto.getName());
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용자를 찾을 수 없습니다.");
        }
    }

    // 비밀번호 재설정 컨트롤러
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String newPassword = request.get("newPassword");

        boolean updated = userService.resetPassword(email, newPassword);
        if (updated) {
            return ResponseEntity.ok("비밀번호가 성공적으로 재설정되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("비밀번호 재설정에 실패했습니다.");
        }
    }

}
