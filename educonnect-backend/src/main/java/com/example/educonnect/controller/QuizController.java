package com.example.educonnect.controller;

import com.example.educonnect.model.Quiz;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RequestMapping(path = "/quiz")
public interface QuizController {

    @PostMapping(path= "/add")
    public ResponseEntity<Quiz> addQuiz(@RequestBody Quiz quiz);

    @GetMapping(path = "/{qId}")
    public Quiz getQuiz (@PathVariable("qId") Integer qId);

    @GetMapping(path = "/allQuiz")
    public List<Quiz> getquizzes();

    @PutMapping(path = "/update")
    public Quiz updateQuiz(@RequestBody Quiz quiz);

    @DeleteMapping(path = "/{qId}")
    public  void deleteQuiz(@PathVariable("qId") Integer qId);
}
