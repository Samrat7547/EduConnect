import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private baseUrl = 'http://localhost:8080/question';
  constructor(private http: HttpClient) { }

  public getQuestionsOfQuiz(qid: any)
  {
    return this.http.get(`${this.baseUrl}/quiz/all/${qid}`);
  }

  public addQuestion(question: any){
    return this.http.post(`${this.baseUrl}/add`,question);
  }
  public deleteQuestion(questionId: any){
    return this.http.delete(`${this.baseUrl}/${questionId}`);
  }
  public getQuestionsOfQuizForTest(qid: any)
  {
    return this.http.get(`${this.baseUrl}/quiz/${qid}`);
  }

}
