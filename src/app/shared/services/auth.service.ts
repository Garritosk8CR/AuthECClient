import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TOKEN_KEY } from '../Constants';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  
  createUser(model: any) {
    return this.http.post(`${environment.apiBaseUrl}/signup`, model);
  }
  signin(model: any) {
    return this.http.post(`${environment.apiBaseUrl}/signin`, model);
  }
  isLoggedIn() {
    return !!localStorage.getItem(TOKEN_KEY);
  }
  saveToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  }
  deleteToken() {
    localStorage.removeItem(TOKEN_KEY);
  }
}
