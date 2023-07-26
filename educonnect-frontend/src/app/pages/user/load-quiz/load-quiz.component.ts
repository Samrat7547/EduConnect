import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuizService } from 'src/app/services/quiz/quiz.service';
import { InstructionsComponent } from '../instructions/instructions.component';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css'],
})
export class LoadQuizComponent implements OnInit {
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
      if (this.catId == 0) {
        console.log('Load all the quiz');
        this._quiz.getActiveQuizzes().subscribe(
          // this._quiz.quizzes().subscribe(
          (data: any) => {
            this.quizzes = data;
            console.log(data);
          },
          (error) => {
            console.log(error);
            this.toastr.error('Error!!', 'Error in fetching quiz');
          }
        );
      } else if (this.catId == 'user-profile') {
        this.toastr.error('Error!!', 'Laugh out loud');
        this.router.navigate(['/user-dashboard/user-profile']);
      } else {
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
      }
    });
  }

  openDialog(qid: any) {
    const dialogRef = this.dialog.open(InstructionsComponent, {
      data: qid,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
