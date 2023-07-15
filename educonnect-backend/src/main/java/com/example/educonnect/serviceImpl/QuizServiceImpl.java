package com.example.educonnect.serviceImpl;

import com.example.educonnect.model.Quiz;
import com.example.educonnect.repo.QuizRepo;
import com.example.educonnect.service.QuizService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class QuizServiceImpl implements QuizService {

    @Autowired
    private QuizRepo quizRepo;

    @Override
    public Quiz addQuiz(Quiz quiz) {
        return this.quizRepo.save(quiz);
    }

    @Override
    public Quiz updateQuiz(Quiz quiz) {
        return this.quizRepo.save(quiz);
    }

    @Override
    public List<Quiz> getquizzes() {
        return this.quizRepo.findAll();
    }

    @Override
    public Optional<Quiz> getQuiz(Integer qId) {
        return this.quizRepo.findById(qId);
    }

    @Override
    public void deleteQuiz(Integer qId) {
        this.quizRepo.deleteById(qId);
    }
}
