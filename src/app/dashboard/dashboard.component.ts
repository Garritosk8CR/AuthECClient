import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export class DashboardComponent {

  constructor(private router: Router) { }
  onlogout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/signin');
  }
}
