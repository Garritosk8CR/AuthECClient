import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getUserProfile() {
    this.http.get('http://localhost:5023/api/user/profile').subscribe(response => {
      console.log(response);
    });
  }
}
