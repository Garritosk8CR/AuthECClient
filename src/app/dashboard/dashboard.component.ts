import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export class DashboardComponent implements OnInit {

  fullName: string = '';
  constructor(
    private router: Router, 
    private authService: AuthService,
    private userService: UserService
  ) { }
  onLogout() {
    this.authService.deleteToken();
    this.router.navigateByUrl('/signin');
  }
  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: (res: any) => 
        this.fullName = res.fullName,
      error: (err: any) => 
        console.error(err)     
    });
  }
}
