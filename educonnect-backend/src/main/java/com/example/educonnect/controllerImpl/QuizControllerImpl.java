package com.example.educonnect.controllerImpl;


import com.example.educonnect.model.Category;
import com.example.educonnect.model.Quiz;
import com.example.educonnect.service.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@CrossOrigin
@RestController
@RequestMapping(path = "/quiz")
public class QuizControllerImpl{
    @Autowired
    QuizService quizService;

    @PostMapping(path = "/add")
    public ResponseEntity<Quiz> addQuiz(@RequestBody Quiz quiz) {
        Quiz quiz1 = this.quizService.addQuiz(quiz);
        return ResponseEntity.ok(quiz1);
    }

    @GetMapping(path = "/{qId}")
    public Quiz getQuiz(@PathVariable("qId") Integer qId) {
        return this.quizService.getQuiz(qId);
    }

    @GetMapping(path = "/allQuiz")
    public List<Quiz> getquizzes() {
        return this.quizService.getquizzes();
    }

    @PutMapping(path = "/update")
    public Quiz updateQuiz(@RequestBody Quiz quiz) {
        return this.quizService.updateQuiz(quiz);
    }

    @DeleteMapping(path = "/{qId}")
    public void deleteQuiz(@PathVariable("qId") Integer qId) {
        this.quizService.deleteQuiz(qId);
    }

    @GetMapping(path = "/category/{cid}")
    public List<Quiz> getQuizzesOfCategory(@PathVariable("cid") Integer cid) {
        Category category = new Category();
        category.setCid(cid);
        return this.quizService.getquizzesOfCategory(category);
    }

    @GetMapping(path = "/active")
    public List<Quiz> getActiveQuizzes() {
        return this.quizService.getActiveQuizzes();
    }

    @GetMapping(path = "/category/active/{cid}")
    public List<Quiz> getActiveQuizzesOfCategory(@PathVariable("cid") Integer cid) {
        Category category = new Category();
        category.setCid(cid);
        return this.quizService.getActiveQuizzesOfCategory(category);
    }
}
