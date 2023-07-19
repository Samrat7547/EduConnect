import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:8080/category';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  public categories(){
    return this.http.get(`${this.baseUrl}/allCategory`);
  }

  //add new category
  public addCategory(category: any){
    return this.http.post(`${this.baseUrl}/add`,category);
  }


}
