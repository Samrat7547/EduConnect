import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz/quiz.service';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit{
    quizzes!: any;

  // quizzes=[
  //   {
  //     qId:1,
  //     title:'Basic Java Quiz',
  //     description:'questions on basic java',
  //     maxMarks:'100',
  //     numberOfQuestions:'25',
  //     active:'',
  //     category:{
  //       title:'Programming'
  //     }
  //   },
  //   {
  //     qId:2,
  //     title:'Basic Python Quiz',
  //     description:'questions on basic python',
  //     maxMarks:'100',
  //     numberOfQuestions:'25',
  //     active:'',
  //     category:{
  //       title:'Programming'
  //     }
  //   }
  // ]

  constructor(private quiz:QuizService){}
  
  ngOnInit(): void {
    this.quiz.quizzes().subscribe((data:any)=>{
      this.quizzes=data;
      console.log(this.quizzes);
      
    },
    (error)=>{
      console.log(error);
      
    })
  }

}
