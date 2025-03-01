import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  baseUrl = 'http://localhost:5023/api';
  createUser(model: any) {
    return this.http.post(`${this.baseUrl}/signup`, model);
  }
}
