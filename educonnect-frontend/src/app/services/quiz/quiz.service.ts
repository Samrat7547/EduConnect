import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private baseUrl = 'http://localhost:8080/quiz';

  constructor(private http: HttpClient) { }

  public quizzes()
  {
    return this.http.get(`${this.baseUrl}/allQuiz`);
  }

  public addQuiz(quiz: any){
    return this.http.post(`${this.baseUrl}/add`,quiz);
  }
  public deleteQuiz(qId: any){
    return this.http.delete(`${this.baseUrl}/${qId}`);
  }
  public getQuiz(qId: any){
    return this.http.get(`${this.baseUrl}/${qId}`);
  }
  public updateQuiz(quiz: any){
    return this.http.put(`${this.baseUrl}/update`,quiz);
  }
  public getQuizzesOfCategory(cid: any){
    return this.http.get(`${this.baseUrl}/category/${cid}`);
  }
  public getActiveQuizzes(){
    return this.http.get(`${this.baseUrl}/active`);
  }
  public getActiveQuizzesOfCategory(cid: any){
    return this.http.get(`${this.baseUrl}/category/active/${cid}`);
  }

}
