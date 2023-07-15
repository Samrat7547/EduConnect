package com.example.educonnect.repo;

import com.example.educonnect.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizRepo extends JpaRepository<Quiz,Integer> {
}
