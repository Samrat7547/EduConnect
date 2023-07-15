package com.example.educonnect.repo;

import com.example.educonnect.model.Question;
import com.example.educonnect.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepo extends JpaRepository<Question,Integer> {
    List<Question> findByQuiz(Quiz quiz);
}
