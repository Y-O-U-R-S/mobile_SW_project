package com.example.Onyang.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Onyang.model.Notice;
import com.example.Onyang.repository.NoticeRepository;

@Service
public class NoticeService {

    @Autowired
    private NoticeRepository noticeRepository;

    public List<Notice> getAllNotices() {
        return noticeRepository.findAll();
    }

    public Notice addNotice(Notice notice) {
        notice.setDate(LocalDateTime.now());
        return noticeRepository.save(notice);
    }

    public boolean deleteNoticeById(int id) {
        try {
            noticeRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public Notice findById(int id) {
        Optional<Notice> notice = noticeRepository.findById(id);
        return notice.orElse(null);
    }

    public Notice updateNotice(int id, Notice notice) {
        Optional<Notice> existingNoticeOptional = noticeRepository.findById(id);

        if (existingNoticeOptional.isPresent()) {
            Notice existingNotice = existingNoticeOptional.get();

            // ID는 변경하지 않음
            existingNotice.setTitle(notice.getTitle());
            existingNotice.setDetail(notice.getDetail());
            existingNotice.setDate(LocalDateTime.now());

            return noticeRepository.save(existingNotice);
        } else {
            return null;
        }
    }
}
