package com.example.Onyang.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Onyang.model.ClubUsage;
import com.example.Onyang.repository.ClubUsageRepository;

@Service
public class ClubUsageService {
    @Autowired
    private ClubUsageRepository clubUsageRepository;

    public ClubUsage rentRoom(ClubUsage usage) {
        return clubUsageRepository.save(usage);
    }
}
