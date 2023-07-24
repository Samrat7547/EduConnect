package com.example.educonnect.service;

import com.example.educonnect.model.Category;
import com.example.educonnect.model.Quiz;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface QuizService {
    public Quiz addQuiz(Quiz quiz);

    public Quiz updateQuiz(Quiz quiz);

    public List<Quiz> getquizzes();

    public Quiz getQuiz(Integer qId);

    public void deleteQuiz(Integer qId);


    public List<Quiz> getquizzesOfCategory(Category category);

    public  List<Quiz> getActiveQuizzes();

    public List<Quiz> getActiveQuizzesOfCategory(Category c);
}
