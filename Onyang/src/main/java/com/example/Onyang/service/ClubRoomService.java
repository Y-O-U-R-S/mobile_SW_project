package com.example.Onyang.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Onyang.model.ClubRoom;
import com.example.Onyang.repository.ClubRoomRepository;

@Service
public class ClubRoomService {
    @Autowired
    private ClubRoomRepository clubRoomRepository;

    public ClubRoom addRoom(ClubRoom room) {
        return clubRoomRepository.save(room);
    }

    //대실
    public void updateRoomValidity(int roomId, boolean isValid) {
        ClubRoom room = clubRoomRepository.findById(roomId).orElseThrow();
        room.setValid(isValid);
        clubRoomRepository.save(room);
    }
}
