package com.example.educonnect.serviceImpl;

import com.example.educonnect.model.Question;
import com.example.educonnect.model.Quiz;
import com.example.educonnect.repo.QuestionRepo;
import com.example.educonnect.service.QuestionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private QuestionRepo questionRepo;


    @Override
    public Question addQuestion(Question question) {
        return this.questionRepo.save(question);
    }

    @Override
    public Question updateQuestion(Question question) {
        return this.questionRepo.save(question);
    }

    @Override
    public List<Question> getQuestions() {
        return this.questionRepo.findAll();
    }

    @Override
    public Question getQuestion(Integer quesId) {
        return this.questionRepo.findById(quesId).get();
    }

    @Override
    public List<Question> getQuestionsOfQuiz(Quiz quiz) {
        return this.questionRepo.findByQuiz(quiz);
    }
}
