package com.example.educonnect.service;

import com.example.educonnect.model.Quiz;

import java.util.List;
import java.util.Optional;

public interface QuizService {
    public Quiz addQuiz(Quiz quiz);

    public Quiz updateQuiz(Quiz quiz);

    public List<Quiz> getquizzes();

    public Optional<Quiz> getQuiz(Integer qId);

    public void deleteQuiz(Integer qId);

}
