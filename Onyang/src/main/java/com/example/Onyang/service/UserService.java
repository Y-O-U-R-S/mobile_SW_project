package com.example.Onyang.service;

import com.example.Onyang.model.User;
import com.example.Onyang.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

// 서비스 레이어의 컴포넌트임을 나타냄
// 서비스 클래스 : 사용자 관련 비즈니스 로직을 구현
@Service
public class UserService {

    // 의존성 주입하여 JPARepository를 사용하여 데이터베이스와의 상호작용
    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User addUser(User user) {
        return userRepository.save(user);
    }

    public boolean deleteUserById(String id) { 
        try {
            userRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    
    public User findById(String id) {
        Optional<User> user = userRepository.findById(id);
        return user.orElse(null);
    }
    
    public boolean authenticateUser(String id, String password) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return true;
        }
        return false;
    }

    public boolean existsById(String id) {
        return userRepository.existsById(id);
    }


    public User updateUser(String id, User userDto) {
        Optional<User> existingUser = userRepository.findById(id);
        if (existingUser.isPresent()) {
            User userToUpdate = existingUser.get();
            userToUpdate.setName(userDto.getName());
            userToUpdate.setPassword(userDto.getPassword());
            userToUpdate.setAddress(userDto.getAddress());
            userToUpdate.setPhone(userDto.getPhone());
            userToUpdate.setBirth(userDto.getBirth());
            userToUpdate.setJob(userDto.getJob());
            userToUpdate.setEmail(userDto.getEmail());
            return userRepository.save(userToUpdate);
        }
        return null;
    }

    // 이름과 이메일로 사용자 인증(비밀번호 찾기)
    public User findByEmailAndName(String email, String name) {
        Optional<User> user = userRepository.findById(email);
        if (user.isPresent() && user.get().getName().equals(name)) {
            return user.get();
        }
        return null;
    }

    // 비밀번호 재설정(비밀번호 찾기)
    public boolean resetPassword(String email, String newPassword) {
        Optional<User> user = userRepository.findById(email);
        if (user.isPresent()) {
            User userToUpdate = user.get();
            userToUpdate.setPassword(newPassword);
            userRepository.save(userToUpdate);
            return true;
        }
        return false;
    }
}