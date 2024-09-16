package com.example.Onyang.service;

import com.example.Onyang.model.User;
import com.example.Onyang.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

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
            userToUpdate.setSchool(userDto.getSchool());
            userToUpdate.setPhone(userDto.getPhone());
            userToUpdate.setClub(userDto.getClub());
            userToUpdate.setStunum(userDto.getStunum());
            userToUpdate.setMaster(userDto.isMaster());
            userToUpdate.setGender(userDto.getGender());
            userToUpdate.setCaution(userDto.getCaution());
            return userRepository.save(userToUpdate);
        }
        return null;
    }
}