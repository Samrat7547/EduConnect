package com.example.educonnect.controllerImpl;

import com.example.educonnect.controller.QuizController;
import com.example.educonnect.model.Quiz;
import com.example.educonnect.service.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@CrossOrigin
@RestController
public class QuizControllerImpl implements QuizController {

    private final QuizService quizService;

    @Override
    public ResponseEntity<Quiz> addQuiz(Quiz quiz) {
        Quiz quiz1 = this.quizService.addQuiz(quiz);
        return ResponseEntity.ok(quiz1);
    }

    @Override
    public Quiz getQuiz(Integer qId) {
        return this.quizService.getQuiz(qId);
    }

    @Override
    public List<Quiz> getquizzes() {
        return this.quizService.getquizzes();
    }

    @Override
    public Quiz updateQuiz(Quiz quiz) {
        return this.quizService.updateQuiz(quiz);
    }

    @Override
    public void deleteQuiz(Integer qId) {
        this.quizService.deleteQuiz(qId);
    }
}
