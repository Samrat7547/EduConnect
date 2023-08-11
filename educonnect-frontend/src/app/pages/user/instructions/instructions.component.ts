import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { QuizService } from 'src/app/services/quiz/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css'],
})
export class InstructionsComponent implements OnInit {
  // qid!:any;
  quiz!: any;
  private allowEscKey = true;

  // constructor(private _route:ActivatedRoute, private _quiz:QuizService, private toastr:ToastrService){}
  constructor(
    private _route: ActivatedRoute,
    private _quiz: QuizService,
    private toastr: ToastrService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public qid: any
  ) {
    console.log('Received qid in InstructionsComponent:', qid);
  }

  ngOnInit(): void {
    this._quiz.getQuiz(this.qid).subscribe(
      (data: any) => {
        console.log(data);
        this.quiz = data;
      },
      (error) => {
        console.log(error);
        this.toastr.error('Error!!', 'Error in Loading');
      }
    );
  }

  // constructor(@Inject(MAT_DIALOG_DATA) public qid: any) {
  //   console.log('Received qid in InstructionsComponent:', qid);

  // ngOnInit(): void {
  //   this.qid=this._route.snapshot.params['qid'];
  //   console.log(this.qid);

  //   this._quiz.getQuiz(this.qid).subscribe(
  //     (data:any)=>{
  //       console.log(data);
  //       this.quiz=data;

  //     },
  //     (error)=>{
  //       console.log(error);
  //       this.toastr.error('Error!!','Error in Loading');

  //     }
  //   )

  // }

  startTest() {
    Swal.fire({
      title: 'Do you want to start the Test?',
      // showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Start',
      // denyButtonText: `Don't save`,
      icon: 'info',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // Swal.fire('Get Ready for the Test', '', 'success')

        this.router.navigate(['/start/' + this.qid]);

        // Call the browser's full-screen API here to enter full-screen mode
        const element = document.documentElement;
        if (element.requestFullscreen) {
          element.requestFullscreen();
        }
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }
}
