package com.example.Onyang.repository;

import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Onyang.model.Notice;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Integer> {
    List<Notice> findByDate(LocalDateTime date);

    List<Notice> findById(String id);

    List<Notice> findByTextContaining(String text);
}
