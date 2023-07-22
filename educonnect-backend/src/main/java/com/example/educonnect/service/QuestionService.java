package com.example.educonnect.service;

import com.example.educonnect.model.Question;
import com.example.educonnect.model.Quiz;
import jakarta.persistence.criteria.CriteriaBuilder;

import java.util.List;

public interface QuestionService {

    public Question addQuestion(Question question);

    public Question updateQuestion(Question question);

    public List<Question> getQuestions();

    public Question getQuestion(Integer quesId);

    public List<Question> getQuestionsOfQuiz(Quiz quiz);



    public void deleteQuestion(Integer quesId);
}
