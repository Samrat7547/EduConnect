package com.example.educonnect.controller;

import com.example.educonnect.model.Question;
import com.example.educonnect.model.Quiz;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RequestMapping(path = "/question")
public interface QuestionController {

    @PostMapping(path= "/add")
    public ResponseEntity<Question> addQuestion(@RequestBody Question question);

    @PutMapping(path = "/update")
    public ResponseEntity<Question> updateQuestion(@RequestBody Question question);

    //Get all questions of any quiz
    @GetMapping(path="/quiz/{qid}")
//    public ResponseEntity<?> getQuestionsOfQuiz(@PathVariable("qId") Integer qId);
    public ResponseEntity<?> getQuestionsOfQuiz(@PathVariable("qid") Integer qid);

    @GetMapping("/{quesId}")
    public Question getQuestion(@PathVariable("quesId") Integer quesId);

    @DeleteMapping("/{quesId}")
    public void deleteQuestion(@PathVariable("quesId") Integer quesId);


}
