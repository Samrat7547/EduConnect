package com.example.educonnect.controllerImpl;

import com.example.educonnect.controller.QuestionController;
import com.example.educonnect.model.Question;
import com.example.educonnect.model.Quiz;
import com.example.educonnect.service.QuestionService;
import com.example.educonnect.service.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RequiredArgsConstructor
@CrossOrigin
@RestController
public class QuestionControllerImpl implements QuestionController {

    @Autowired
    QuestionService questionService;
    @Autowired
    QuizService quizService;

    @Override
    public ResponseEntity<Question> addQuestion(Question question) {
        return ResponseEntity.ok(this.questionService.addQuestion(question));
    }

    @Override
    public ResponseEntity<Question> updateQuestion(Question question) {
        return ResponseEntity.ok(this.questionService.updateQuestion(question));
    }

    @Override
    public ResponseEntity<?> getQuestionsOfQuiz(Integer qid) {
        Quiz quiz= new Quiz();
        quiz.setQId(qid);
        List<Question> questionsOfQuiz=this.questionService.getQuestionsOfQuiz(quiz);
        return ResponseEntity.ok(questionsOfQuiz);


//        Optional<Quiz> quiz = this.quizService.getQuiz(qid);
//        Set<Question> questions = quiz.get().getQuestions();
////        List<Question> questions = (List<Question>) quiz.get().getQuestions();
//        List list = new ArrayList(questions);
//        if (list.size() > Integer.parseInt(quiz.get().getNumberOfQuestions())) {
//            list = list.subList(0, Integer.parseInt(quiz.get().getNumberOfQuestions() + 1));
//        }
//        Collections.shuffle(list);
//        return ResponseEntity.ok(list);

    }

    @Override
    public Question getQuestion(Integer quesId) {
        return this.questionService.getQuestion(quesId);
    }

    @Override
    public void deleteQuestion(Integer quesId) {
        this.questionService.deleteQuestion(quesId);
    }

}
