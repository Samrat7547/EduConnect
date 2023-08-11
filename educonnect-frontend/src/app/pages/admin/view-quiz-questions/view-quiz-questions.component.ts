import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuestionService } from 'src/app/services/question/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css'],
})
export class ViewQuizQuestionsComponent implements OnInit {
  qId: any;
  qTitle: any;
  // questions=[];
  questions!: any;

  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    console.log(this.qId);
    console.log(this.qTitle);

    this._question.getQuestionsOfQuiz(this.qId).subscribe(
      (data: any) => {
        console.log(data);
        this.questions = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteQuestion(qid: any) {
    //  alert(qid);
    Swal.fire({
      icon: 'warning',
      title: 'Do you want to delete?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        //delete
        this._question.deleteQuestion(qid).subscribe(
          (data: any) => {
            this.questions = this.questions.filter(
              (question: any) => question.quesId != qid
            );
            this.toastr.success('Success!', 'Question deleted successfully');
          },
          (error) => {
            console.log(error);
            this.toastr.error('Error', 'Error in deleting question');
          }
        );
      }
    });
  }
}
