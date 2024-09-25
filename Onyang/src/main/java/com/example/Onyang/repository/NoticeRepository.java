package com.example.Onyang.repository;

import org.springframework.stereotype.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Onyang.model.Notice;


@Repository
public interface NoticeRepository extends JpaRepository<Notice, Integer> {
    Optional<Notice> findById(int id);
}
