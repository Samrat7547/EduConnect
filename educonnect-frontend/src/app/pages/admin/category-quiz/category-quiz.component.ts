import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuizService } from 'src/app/services/quiz/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-quiz',
  templateUrl: './category-quiz.component.html',
  styleUrls: ['./category-quiz.component.css']
})
export class CategoryQuizComponent implements OnInit{
  catId!: any;
  quizzes!: any;
  qid!: any;

  constructor(
    private _route: ActivatedRoute,
    private router: Router,
    private _quiz: QuizService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this._route.params.subscribe((params: any) => {
      // console.log(params);
      this.catId = params.catId;
      console.log(this.catId);
        console.log('Load specific quiz');
        // this._quiz.getQuizzesOfCategory(this.catId).subscribe(
        this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe(
          (data: any) => {
            this.quizzes = data;
            console.log(data);
          },
          (error) => {
            console.log(error);
            this.toastr.error('Error!!', 'Error in fetching quiz');
          }
        );
      
    });
  }

  deleteQuiz(qId: any){
    // alert(qId);
    Swal.fire({
      icon:"warning",
      title:"Do you want to delete?",
      confirmButtonText:"Delete",
      showCancelButton:true,
    }).then((result)=>{
      if(result.isConfirmed){
        //delete
        this._quiz.deleteQuiz(qId).subscribe(
          (data:any)=>{
            this.quizzes=this.quizzes.filter((quiz:any)=>quiz.qid!=qId)
            this.toastr.success('Success!','Quiz deleted successfully');
          },
          (error)=>{
            console.log(error);
            this.toastr.error('Error','Error in deleting quiz');
          }
        );
      }
    })
  }

}
