package com.example.educonnect.serviceImpl;

import com.example.educonnect.model.Category;
import com.example.educonnect.model.Quiz;
import com.example.educonnect.repo.QuizRepo;
import com.example.educonnect.service.QuizService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
    public Quiz getQuiz(Integer qId) {
        return this.quizRepo.findById(qId).get();
    }

    @Override
    public void deleteQuiz(Integer qId) {
        this.quizRepo.deleteById(qId);
    }

    @Override
    public List<Quiz> getquizzesOfCategory(Category category) {
        return this.quizRepo.findBycategory(category);
    }

    @Override
    public List<Quiz> getActiveQuizzes() {
        return this.quizRepo.findByActive(true);
    }

    @Override
    public List<Quiz> getActiveQuizzesOfCategory(Category c) {
        return this.quizRepo.findByCategoryAndActive(c,true);
    }
}
