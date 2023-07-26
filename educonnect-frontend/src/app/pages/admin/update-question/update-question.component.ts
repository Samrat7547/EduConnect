import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastrService } from 'ngx-toastr';
import { QuestionService } from 'src/app/services/question/question.service';
import { QuizService } from 'src/app/services/quiz/quiz.service';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css'],
})
export class UpdateQuestionComponent implements OnInit {

  public Editor = ClassicEditor;

  @ViewChild('editorRef', { static: false }) editorInstance: any; // You can use 'CKEditorComponent' type here if needed

  quesId = 0;
  quiz!: any;
  // question!: any;
  qId: any;

  question={
    quiz:{
      qid:'',
      // title:''
    } ,
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
  }
  qTitle: any;

  constructor(
    private _route: ActivatedRoute,
    private _quiz: QuizService,
    private _question: QuestionService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.quesId = this._route.snapshot.params['quesId'];
    this.qId= this._route.snapshot.params['qid'];
    this.qTitle= this._route.snapshot.params['title'];

    // alert(this.quesId);
    // alert(this.qId);

    this.question.quiz['qid']= this.qId;
    // this.question.quiz['title']=this.qTitle
    this._question.getQuestion(this.quesId).subscribe(
      (data: any) => {
        this.question = data;
        console.log(this.question);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public updateData(){
    // alert('test');
     //validate it

     this._question.updateQuestion(this.question).subscribe(
      (data:any)=>
      {
        this.toastr.success('Success!!',' Question Updated Successfully');
        // this.router.navigate(['/admin/quizzes']);
        // Add a delay of 2 seconds (adjust the value as needed)
    setTimeout(() => {
      // this.router.navigate(['/admin/quizzes/']);
      this.router.navigate(['/admin/view-questions/'+this.qId+'/'+this.qTitle]);

    }, 500);
      },
      (error)=>{
        console.log(error);
          this.toastr.error('Error','Error in updating question');
      }
      );
     
   }

}
