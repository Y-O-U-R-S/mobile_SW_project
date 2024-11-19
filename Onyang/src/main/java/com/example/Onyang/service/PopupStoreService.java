package com.example.Onyang.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Onyang.model.PopupStore;
import com.example.Onyang.repository.PopupStoreRepository;

import java.util.*;

@Service
public class PopupStoreService {
    @Autowired
    private PopupStoreRepository popupStoreRepository;

    public PopupStore addPopupStore(PopupStore popupStore) {
        return popupStoreRepository.save(popupStore);
    }

    public List<PopupStore> getAllPopupStores() {
        return popupStoreRepository.findAll();
    }

    public PopupStore findById(int id) {
        Optional<PopupStore> popupStore = popupStoreRepository.findById(id);
        return popupStore.orElse(null);
    }

    public boolean deletePopup(int id) {
        try{
            popupStoreRepository.deleteById(id);
            return true;
        } catch(Exception e){
            return false;
        }
    }


}
