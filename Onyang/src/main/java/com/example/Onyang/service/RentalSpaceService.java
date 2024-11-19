package com.example.Onyang.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Onyang.model.RentalSpace;
import com.example.Onyang.repository.RentalSpaceRepository;

import java.util.*;

@Service
public class RentalSpaceService {
    @Autowired
    private RentalSpaceRepository rentalSpaceRepository;
    
    public RentalSpace addSpace(RentalSpace spaceId) {
        return rentalSpaceRepository.save(spaceId);
    }

    public List<RentalSpace> getAllSpaces() {
        return rentalSpaceRepository.findAll();
    }

    public RentalSpace findById(int id) {
        Optional<RentalSpace> clubRoom = rentalSpaceRepository.findById(id);
        return clubRoom.orElse(null);
    }

    public boolean deleteSpace(int spaceId){
        try{
            rentalSpaceRepository.deleteById(spaceId);
            return true;
        } catch(Exception e){
            return false;
        }

    }
}
