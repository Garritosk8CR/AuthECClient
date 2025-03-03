import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TOKEN_KEY } from '../Constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  baseUrl = 'http://localhost:5023/api';
  createUser(model: any) {
    return this.http.post(`${this.baseUrl}/signup`, model);
  }
  signin(model: any) {
    return this.http.post(`${this.baseUrl}/signin`, model);
  }
  isLoggedIn() {
    return !!localStorage.getItem(TOKEN_KEY);
  }
  deleteToken() {
    localStorage.removeItem(TOKEN_KEY);
  }
}
