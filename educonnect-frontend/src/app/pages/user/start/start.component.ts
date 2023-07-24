import { LocationStrategy } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { QuestionService } from 'src/app/services/question/question.service';
import { ShareddataService } from 'src/app/services/sharedData/shared-data.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit{

  qid!:any;
  questions!:any;

  constructor(private locationSt:LocationStrategy, private authService: AuthService,
    private router: Router,private sharedDataService: ShareddataService,
    private toastr: ToastrService,private _route:ActivatedRoute,
    private question:QuestionService){

  }

  ngOnInit(): void {

    // this.preventBackButton();
    // this.visibilityChangeHandler;

    
    this.qid=this._route.snapshot.params['qid'];
    console.log(this.qid);
    this.loadQuestions();
    
    
    
   
  }

  // preventBackButton(){
  //   history.pushState(null,'',location.href);
  //   this.locationSt.onPopState(()=>{
  //     history.pushState(null,'',location.href)
  //   })
  // }
  loadQuestions(){
    this.question.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data:any)=>{
        console.log(data);
        this.questions=data;
      },
      (error)=>{
        console.log(error);
        this.toastr.error('Error!!','Error in loading questions');
        
      }
    )
  }


  
  // @HostListener('document:visibilitychange', ['$event'])
  // visibilityChangeHandler(event: Event) {
  //   if (document.visibilityState === 'hidden') {
  //     this.authService.logout();
  //     this.sharedDataService.setUserDetails('');
  //   // this.sharedDataService.setUserRole('');
  //   this.toastr.info('Navigating to another window', 'Logged Out');
  //   this.router.navigate(['/home']);
  //   }
  // }

}
