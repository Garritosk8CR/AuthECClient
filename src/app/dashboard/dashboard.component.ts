import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }
  onLogout() {
    this.authService.deleteToken();
    this.router.navigateByUrl('/signin');
  }
  ngOnInit(): void {
  }
}
