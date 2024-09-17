package com.example.Onyang.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Onyang.model.ClubUsage;
import com.example.Onyang.repository.ClubUsageRepository;

import java.util.*;

@Service
public class ClubUsageService {
    @Autowired
    private ClubUsageRepository clubUsageRepository;

    public ClubUsage rentRoom(ClubUsage usage) {
        return clubUsageRepository.save(usage);
    }

    public void deleteUsage(int roomId){
        clubUsageRepository.deleteById(roomId);
    }

    public List<ClubUsage> getAllUsages() {
        return clubUsageRepository.findAll();
    }

    public ClubUsage findById(int id) {
        Optional<ClubUsage> clubUsage = clubUsageRepository.findById(id);
        return clubUsage.orElse(null);
    }

}
