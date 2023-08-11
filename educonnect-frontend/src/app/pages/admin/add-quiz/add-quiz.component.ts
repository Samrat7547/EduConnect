import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category/category.service';
import { QuizService } from 'src/app/services/quiz/quiz.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css'],
})
export class AddQuizComponent implements OnInit {
  categories!: any;

  quizData = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category: {
      cid: '',
    },
  };

  constructor(
    private _cat: CategoryService,
    private toastr: ToastrService,
    private router: Router,
    private _quiz: QuizService
  ) {}

  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data: any) => {
        this.categories = data;
        console.log(this.categories);
      },
      (error) => {
        console.log(error);
        this.toastr.error('Error', 'Server error');
      }
    );
  }

  addQuiz() {
    if (this.quizData.title.trim() == '' || this.quizData.title == null) {
      this.toastr.error('Title required!');
      return;
    }
    if (this.quizData.maxMarks.trim() == '' || this.quizData.maxMarks == null) {
      this.toastr.error('Maximun Marks required!');
      return;
    }
    if (
      this.quizData.numberOfQuestions.trim() == '' ||
      this.quizData.numberOfQuestions == null
    ) {
      this.toastr.error('Number of Questions required!');
      return;
    }

    this._quiz.addQuiz(this.quizData).subscribe(
      (data: any) => {
        this.quizData.title = '';
        this.quizData.description = '';
        this.quizData.maxMarks = '';
        this.quizData.numberOfQuestions = '';
        this.quizData.category.cid = '';
        // this.router.navigate(['/admin/quizzes']);
        this.toastr.success('Success!', 'Quiz added successfully');
        setTimeout(() => {
          console.log('Refreshed');
          window.location.reload();
        }, 500);
      },
      (error) => {
        console.log(error);
        this.toastr.error('Error', 'Server error');
      }
    );
  }
}
