import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import User from 'src/app/model/User';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  register(user: User) {
    console.log(user);
    
    return this.http.post(`${this.baseUrl}/signup`, user);
  }

  login(email: string, password: string) {
    const body = {
      userName: email,
      password: password,
    };
    return this.http.post(`${this.baseUrl}/login`, body);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userDetails');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token === null || token === undefined) {
      return false;
    }
    // decode token to check if it's expired
    const isTokenExpired = this.jwtHelper.isTokenExpired(token);
    return !isTokenExpired;
  }

  getRole(): boolean {
    const role = localStorage.getItem('role');
    return role === 'admin';
  }

  getUserDetails(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`http://localhost:8080/user/userDetails`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getAllUsers(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`http://localhost:8080/user/allUser`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  public deleteUser(Id: any){
    const token = localStorage.getItem('token');
    return this.http.delete(`${this.baseUrl}/delete/${Id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}