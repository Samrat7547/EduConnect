package com.example.educonnect.controllerImpl;


import com.example.educonnect.model.Question;
import com.example.educonnect.model.Quiz;
import com.example.educonnect.service.QuestionService;
import com.example.educonnect.service.QuizService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Slf4j
@RequiredArgsConstructor
@CrossOrigin
@RestController
@RequestMapping(path = "/question")
public class QuestionControllerImpl{

    @Autowired
    QuestionService questionService;
    @Autowired
    QuizService quizService;

    @PostMapping(path = "/add")
    public ResponseEntity<Question> addQuestion(@RequestBody Question question) {
        return ResponseEntity.ok(this.questionService.addQuestion(question));
    }

    @PutMapping(path = "/update")
    public ResponseEntity<Question> updateQuestion(@RequestBody Question question) {
        return ResponseEntity.ok(this.questionService.updateQuestion(question));
    }

    @GetMapping(path = "/quiz/{qid}")
    public ResponseEntity<?> getQuestionsOfQuiz(@PathVariable("qid") Integer qid) {
        Quiz quiz = this.quizService.getQuiz(qid);
//        log.info(String.valueOf(quiz));
        List<Question> questionsOfQuiz = this.questionService.getQuestionsOfQuiz(quiz);
        List list = new ArrayList(questionsOfQuiz);
        int result = Integer.parseInt(quiz.getNumberOfQuestions());
        if (list.size() > Integer.parseInt(quiz.getNumberOfQuestions())) {
            list = list.subList(0, Integer.parseInt(quiz.getNumberOfQuestions()));
        }
        Collections.shuffle(list);
//        log.info(String.valueOf(result));
        return ResponseEntity.ok(list);

    }

    @GetMapping(path = "/quiz/all/{qid}")
    public ResponseEntity<?> getQuestionsOfQuizAdmin(@PathVariable("qid") Integer qid) {
        Quiz quiz = new Quiz();
        quiz.setQId(qid);
        List<Question> questionsOfQuiz = this.questionService.getQuestionsOfQuiz(quiz);
        return ResponseEntity.ok(questionsOfQuiz);
    }

    @GetMapping("/{quesId}")
    public Question getQuestion(@PathVariable("quesId") Integer quesId) {
        return this.questionService.getQuestion(quesId);
    }

    @DeleteMapping("/{quesId}")
    public void deleteQuestion(@PathVariable("quesId") Integer quesId) {
        this.questionService.deleteQuestion(quesId);
    }

}
