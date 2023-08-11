import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { QuizService } from 'src/app/services/quiz/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css'],
})
export class ViewQuizzesComponent implements OnInit {
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

  constructor(private _quiz: QuizService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data: any) => {
        this.quizzes = data;
        console.log(this.quizzes);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteQuiz(qId: any) {
    // alert(qId);
    Swal.fire({
      icon: 'warning',
      title: 'Do you want to delete?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        //delete
        this._quiz.deleteQuiz(qId).subscribe(
          (data: any) => {
            this.quizzes = this.quizzes.filter((quiz: any) => quiz.qid != qId);
            this.toastr.success('Success!', 'Quiz deleted successfully');
          },
          (error) => {
            console.log(error);
            this.toastr.error('Error', 'Delete all its questions first');
          }
        );
      }
    });
  }
}
