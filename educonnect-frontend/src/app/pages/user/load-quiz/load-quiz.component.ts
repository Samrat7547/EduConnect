import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuizService } from 'src/app/services/quiz/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit{
  catId!:any;
  quizzes!:any;

  constructor(private _route:ActivatedRoute, private _quiz:QuizService,private toastr:ToastrService){}
  ngOnInit(): void {
    this.catId=this._route.snapshot.params['catId'];
    console.log(this.catId);

    if(this.catId==0){
      console.log("Load all the quiz");
      this._quiz.quizzes().subscribe(
        (data:any)=>{
          this.quizzes=data;
          console.log(data);
        },
        (error)=>{
            console.log(error);
            this.toastr.error('Error!!','Error in fetching quiz')
            
        }
      );
    }else{
      console.log("Load specific quiz");
      
    }
    
  }

}
