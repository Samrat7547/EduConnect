import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuestionService } from 'src/app/services/question/question.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'],
})
export class AddQuestionComponent implements OnInit {
  public Editor = ClassicEditor;

  @ViewChild('editorRef', { static: false }) editorInstance: any; // You can use 'CKEditorComponent' type here if needed

  qId!: any;
  qTitle!: any;
  question = {
    quiz: {
      qid: '',
    },
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
  };

  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    // alert(this.qId);
    // alert(this.qTitle);
    this.question.quiz['qid'] = this.qId;
  }

  formSubmit() {
    // alert("testing");
    if (this.question.content.trim() == '' || this.question.content == null) {
      this.toastr.error('Content required!');
      return;
    }
    if (this.question.option1.trim() == '' || this.question.option1 == null) {
      this.toastr.error('Option required!');
      return;
    }
    if (this.question.option2.trim() == '' || this.question.option2 == null) {
      this.toastr.error('Option required!');
      return;
    }
    if (this.question.answer.trim() == '' || this.question.answer == null) {
      this.toastr.error('Answer required!');
      return;
    }

    this._question.addQuestion(this.question).subscribe(
      (data: any) => {
        console.log(data);

        this.question = {
          quiz: {
            qid: '',
          },
          content: '',
          option1: '',
          option2: '',
          option3: '',
          option4: '',
          answer: '',
        };
        this.toastr.success('Success!!', 'Question added successfully');
        setTimeout(() => {
          console.log('Refreshed');
          window.location.reload();
          // this.router.navigate(['/admin/add-question/'+this.qId+'/'+this.qTitle]);
          // this.router.navigate(['/admin/quizzes']);
        }, 500);
      },
      (error) => {
        console.log(error);
        this.toastr.error('Error!!', 'Server error');
      }
    );
  }
}
