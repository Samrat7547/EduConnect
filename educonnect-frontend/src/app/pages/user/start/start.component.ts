import { LocationStrategy } from '@angular/common';

import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { QuestionService } from 'src/app/services/question/question.service';
import { ShareddataService } from 'src/app/services/sharedData/shared-data.service';
import Swal from 'sweetalert2';

const SESSION_TIMEOUT_MS = 60 * 5 * 1000;

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
  encapsulation: ViewEncapsulation.None, // Apply the component's CSS globally
})

// export class StartComponent implements OnInit {
//   qid!: any;
//   questions!: any;

//   marksGot = 0;
//   correctAnswers = 0;
//   attempted = 0;

//   timer:any;

//   isSubmit = false;
//   quizSubmitted: boolean = false;
//   private canRefresh = false;
//   private sessionTimer: any;

//   constructor(
//     private locationSt: LocationStrategy,
//     private authService: AuthService,
//     private router: Router,
//     private sharedDataService: ShareddataService,
//     private toastr: ToastrService,
//     private _route: ActivatedRoute,
//     private question: QuestionService,

//   ) {}

//   @HostListener('window:beforeunload', ['$event'])
//   beforeUnloadHandler(event: Event) {
//     // Prevent the page from refreshing.
//     // event.preventDefault();
//     // localStorage.setItem('timer', this.timer.toString());
//     if (!this.canRefresh) {
//       event.preventDefault();
//       event.returnValue = false;

//     }
//   }

//   @HostListener('document:visibilitychange', ['$event'])
//   visibilityChangeHandler(event: Event) {
//     if (!this.quizSubmitted && document.visibilityState === 'hidden') {
//       this.authService.logout();
//       this.sharedDataService.setUserDetails('');
//       // this.sharedDataService.setUserRole('');
//       this.toastr.info('Navigating to another window', 'Logged Out');
//       this.router.navigate(['/home']);
//     }
//   }

//   @HostListener('window:mousemove', ['$event'])
//   @HostListener('window:keydown', ['$event'])
//   resetSessionTimer() {
//     clearTimeout(this.sessionTimer);
//     this.sessionTimer = setTimeout(() => this.handleInactive(), SESSION_TIMEOUT_MS);
//   }

//   // Capture right-click and contextmenu events
//   @HostListener('document:contextmenu', ['$event'])
//   onRightClick(event: Event) {
//     // event.preventDefault();
//     return false;
//   }

//   // Capture copy and cut events
//   @HostListener('document:cut', ['$event'])
//   @HostListener('document:copy', ['$event'])
//   onCopyOrCut(event: ClipboardEvent) {
//     // event.preventDefault();
//     return false;
//   }

//   ngOnInit(): void {
//     this.preventBackButton();
//     this.visibilityChangeHandler;
//     this.beforeUnloadHandler;
//     this.resetSessionTimer;
//     // this.onCopyOrCut;
//     // this.onRightClick;

//     this.qid = this._route.snapshot.params['qid'];
//     console.log(this.qid);
//     this.loadQuestions();
//     // this.startTimer();

//     // const storedTimer = localStorage.getItem('timer');
//     // if (storedTimer) {
//     //   this.timer = parseInt(storedTimer, 10);
//     // }
//     // this.startTimer();

//   }

//   preventBackButton() {
//     history.pushState(null, '', location.href);
//     this.locationSt.onPopState(() => {
//       history.pushState(null, '', location.href);
//     });
//   }

//   handleInactive() {
//     // Display a modal or message to notify the user about the session expiration.
//     // You can use a library like Angular Material Dialog for this.

//     // On user confirmation, call the logout function.
//     this.authService.logout();
//       this.sharedDataService.setUserDetails('');
//       // this.sharedDataService.setUserRole('');
//       this.toastr.info('Navigating to another window', 'Logged Out');
//       this.router.navigate(['/home']);
//   }
//   loadQuestions() {
//     this.question.getQuestionsOfQuizForTest(this.qid).subscribe(
//       (data: any) => {
//         // console.log(data);
//         this.questions = data;
//         this.timer=this.questions.length * 2 * 60 ;

//         this.questions.forEach((q: any) => {
//           q['givenAnswer'] = '';
//         });
//         this.startTimer();
//       },
//       (error) => {
//         console.log(error);
//         this.toastr.error('Error!!', 'Error in loading questions');
//       }
//     );
//   }

//   submitQuiz() {
//     Swal.fire({
//       title: 'Do you want to submit the Quiz?',
//       // showDenyButton: true,
//       showCancelButton: true,
//       confirmButtonText: 'Submit',
//       // denyButtonText: `Don't save`,
//       icon: 'info',
//     }).then((result) => {
//       /* Read more about isConfirmed, isDenied below */
//       if (result.isConfirmed) {
//         // Swal.fire('Get Ready for the Test', '', 'success')
//         //calculation part
//         this.canRefresh = false;
//         this.quizSubmitted = true;

//         this.evalQuiz();
//       }
//     });
//   }

//   startTimer(){

//     let t= window.setInterval(()=>{
//       localStorage.setItem('timer', this.timer.toString());
//       if(this.timer<=0){
//         this.evalQuiz();
//         // this.submitQuiz()
//         clearInterval(t);
//       }
//       else{
//         this.timer--;
//       }
//     },1000)
//   }

//   getFormatTime(){
//     let min=Math.floor(this.timer/60);
//     let sec= this.timer - min*60;
//     return `${min} min : ${sec} sec`
//   }

//   evalQuiz(){

//         this.isSubmit = true;
//         this.questions.forEach((q: any) => {
//           if (q.givenAnswer == q.answer) {
//             this.correctAnswers++;
//             let marksSingle =
//               this.questions[0].quiz.maxMarks / this.questions.length;
//             this.marksGot += marksSingle;
//           }

//           if (q.givenAnswer.trim() != '') {
//             this.attempted++;
//           }
//         });
//         console.log('Correct Answers:' + this.correctAnswers);
//         console.log('Marks Got:' + this.marksGot);
//         console.log('Attempted:' + this.attempted);
//   }

//   printPage(){
//     window.print();
//   }

//   navigateHome(){
//     localStorage.setItem('refreshPage', "true");
//     this.router.navigate(['/home']);
//     window.location.reload();
//   }

//  }


export class StartComponent implements OnInit {
  qid!: any;
  questions!: any;

  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;

  timer: any;

  isSubmit = false;
  quizSubmitted: boolean = false;
  private canRefresh = false;
  private sessionTimer: any;
  isQuizSubmitted = false;
  @ViewChild('resultCard') resultCard!: ElementRef;
  
  isResultActive = false;
  showResults = false; // Initially, set it to false


  constructor(
    private locationSt: LocationStrategy,
    private authService: AuthService,
    private router: Router,
    private sharedDataService: ShareddataService,
    private toastr: ToastrService,
    private _route: ActivatedRoute,
    private question: QuestionService,
    
    
  ) {}

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: Event) {
    // Prevent the page from refreshing.
    // event.preventDefault();
    // localStorage.setItem('timer', this.timer.toString());
    if (!this.canRefresh) {
      event.preventDefault();
      event.returnValue = false;
    }
  }

  @HostListener('document:visibilitychange', ['$event'])
  visibilityChangeHandler(event: Event) {
    if (!this.quizSubmitted && document.visibilityState === 'hidden') {
      this.authService.logout();
      this.sharedDataService.setUserDetails('');
      // this.sharedDataService.setUserRole('');
      this.toastr.info('Navigating to another window', 'Logged Out');
      this.router.navigate(['/home']);
    }
  }

  @HostListener('window:mousemove', ['$event'])
  @HostListener('window:keydown', ['$event'])
  resetSessionTimer() {
    clearTimeout(this.sessionTimer);
    this.sessionTimer = setTimeout(
      () => this.handleInactive(),
      SESSION_TIMEOUT_MS
    );
  }

  // Capture right-click and contextmenu events
  @HostListener('document:contextmenu', ['$event'])
  onRightClick(event: Event) {
    // event.preventDefault();
    return false;
  }

  // Capture copy and cut events
  @HostListener('document:cut', ['$event'])
  @HostListener('document:copy', ['$event'])
  onCopyOrCut(event: ClipboardEvent) {
    // event.preventDefault();
    return false;
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event: KeyboardEvent) {
    event.preventDefault();
    this.logoutAndNavigateHome();
  }

  logoutAndNavigateHome() {
    this.authService.logout();
    this.sharedDataService.setUserDetails('');
    this.toastr.error('You are logged out', 'You did not follow the rules');

    this.router.navigate(['/home']);
    this.scrollToTop();
  }

  ngOnInit(): void {
    this.preventBackButton();
    this.visibilityChangeHandler;
    this.beforeUnloadHandler;
    this.resetSessionTimer;
    // this.onCopyOrCut;
    // this.onRightClick;
    this.onEscape;

    this.qid = this._route.snapshot.params['qid'];
    console.log(this.qid);
    this.loadQuestions();
    // this.startTimer();

    // const storedTimer = localStorage.getItem('timer');
    // if (storedTimer) {
    //   this.timer = parseInt(storedTimer, 10);
    // }
    // this.startTimer();
    document.addEventListener(
      'fullscreenchange',
      this.exitFullScreenHandler.bind(this)
    );
    if (this.isSubmit) {
      this.isResultActive = true;
    }

  

  }

  
  
  

  exitFullScreenHandler() {
    if (!document.fullscreenElement && !this.isQuizSubmitted) {
      this.logoutAndNavigateHome();
    }
  }

  preventBackButton() {
    history.pushState(null, '', location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, '', location.href);
    });
  }

  handleInactive() {
    // Display a modal or message to notify the user about the session expiration.
    // You can use a library like Angular Material Dialog for this.

    // On user confirmation, call the logout function.
    this.authService.logout();
    this.sharedDataService.setUserDetails('');
    // this.sharedDataService.setUserRole('');
    this.toastr.info('Navigating to another window', 'Logged Out');
    this.router.navigate(['/home']);
  }
  loadQuestions() {
    this.question.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data: any) => {
        // console.log(data);
        this.questions = data;
        this.timer = this.questions.length * 2 * 60;

        this.questions.forEach((q: any) => {
          q['givenAnswer'] = '';
        });
        this.startTimer();
      },
      (error) => {
        console.log(error);
        this.toastr.error('Error!!', 'Error in loading questions');
      }
    );
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the Quiz?',
      // showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Submit',
      // denyButtonText: `Don't save`,
      icon: 'info',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // Swal.fire('Get Ready for the Test', '', 'success')
        
        //calculation part
        
        this.canRefresh = false;

        this.evalQuiz();

        this.isQuizSubmitted = true;

        if (document.fullscreenElement) {
          this.exitFullScreen();
        }
      }
    });
  }

  exitFullScreen() {
    const doc = window.document;
    if (doc.exitFullscreen) {
      doc.exitFullscreen();
    }

    if (!this.isQuizSubmitted) {
      // Remove the event listener when exiting full-screen mode before quiz submission
      document.removeEventListener('keydown', this.onEscapeKeyPress.bind(this));
    }
  }

  onEscapeKeyPress(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      if (document.fullscreenElement) {
        // Exit full-screen mode
        this.exitFullScreen();
        // If the Swal modal should show up after exiting full-screen, call submitQuiz here
        this.submitQuiz();
      }
    }
  }

  startTimer() {
    let t = window.setInterval(() => {
      localStorage.setItem('timer', this.timer.toString());
      if (this.timer <= 0) {
        this.evalQuiz();
        // this.submitQuiz()
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormatTime() {
    let min = Math.floor(this.timer / 60);
    let sec = this.timer - min * 60;
    return `${min} min : ${sec} sec`;
  }

  evalQuiz() {
    this.isSubmit = true;
    this.questions.forEach((q: any) => {
      if (q.givenAnswer == q.answer) {
        this.correctAnswers++;
        let marksSingle =
          this.questions[0].quiz.maxMarks / this.questions.length;
        this.marksGot += marksSingle;
      }

      if (q.givenAnswer.trim() != '') {
        this.attempted++;
      }
    });
    console.log('Correct Answers:' + this.correctAnswers);
    console.log('Marks Got:' + this.marksGot);
    console.log('Attempted:' + this.attempted);
  }

  printPage() {
    window.print();
  }

  navigateHome() {
    localStorage.setItem('refreshPage', 'true');
    this.router.navigate(['/home']);
    this.scrollToTop();
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
