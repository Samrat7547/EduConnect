import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category/category.service';
import { QuizService } from 'src/app/services/quiz/quiz.service';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit{

  qId=0;
  quiz!: any;
  categories! : any;

  constructor( private _route:ActivatedRoute,private _quiz:QuizService,private _cat:CategoryService,private toastr: ToastrService,private router: Router){}

  ngOnInit(): void {
    this.qId=this._route.snapshot.params['qid'];
    // alert(this.qId);
    this._quiz.getQuiz(this.qId).subscribe(
      (data:any)=>{
        this.quiz=data;
        console.log(this.quiz);
        
      },
      (error)=>{
        console.log(error);
        
      }
      
      );

      this._cat.categories().subscribe(
        (data:any)=>{
          this.categories=data;
          console.log(this.categories);
        },
        (error)=>{
          console.log(error);
          this.toastr.error('Error','Error in loading');
        }
      );
      
    

    
  }

  public updateData(){
    // alert('test');
     //validate it

     this._quiz.updateQuiz(this.quiz).subscribe(
      (data:any)=>
      {
        this.toastr.success('Success!!','Updated Successfully');
        // this.router.navigate(['/admin/quizzes']);
        // Add a delay of 2 seconds (adjust the value as needed)
    setTimeout(() => {
      this.router.navigate(['/admin/quizzes']);
    }, 300);
      },
      (error)=>{
        console.log(error);
          this.toastr.error('Error','Error in updating');
      }
      );
     
  }

}
