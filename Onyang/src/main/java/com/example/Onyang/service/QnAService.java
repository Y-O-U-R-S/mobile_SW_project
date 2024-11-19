package com.example.Onyang.service;

import java.time.LocalDateTime;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.Onyang.model.QnA;
import com.example.Onyang.repository.QnARepository;

@Service
public class QnAService {

    @Autowired
    private QnARepository qnARepository;

    public List<QnA> getAllQnA() {
        return qnARepository.findAll();
    }

    // 챗봇에 질문한 내용 db에 추가
    public QnA addQnA(QnA qnA) {
        qnA.setDate(LocalDateTime.now());
        return qnARepository.save(qnA);
    }

    public boolean deleteQnA(int id) {
        try{
            qnARepository.deleteById(id);
            return true;
        } catch(Exception e){
            return false;
        }
    }

    public QnA findById(int id) {
        Optional<QnA> qna = qnARepository.findById(id);
        return qna.orElse(null);
    }

}
