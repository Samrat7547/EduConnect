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
}
