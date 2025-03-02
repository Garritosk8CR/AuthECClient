import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  loginForm: any;
  isSubmitted: boolean = false;
  constructor(
    public formBuilder: FormBuilder, 
    private service: AuthService, 
    private toastr: ToastrService, 
    private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if(this.loginForm.valid) {
      this.service.signin(this.loginForm.value).subscribe({
        next: (res : any) => {
          localStorage.setItem('token', res.token);
          this.toastr.success('Logged in successfully');
          this.router.navigateByUrl('/dashboard');
        },
        error: (err : any) => {
          
          if(err.status === 400) {
            this.toastr.error('Incorrect email or password', 'Login failed');
          } else {
            this.toastr.error('Something went wrong', 'Login failed');
            console.log('error occured during login:\n', err);
          }
          
        }
      })
    }
    // TODO: Implement login logic here
    console.log(this.loginForm.value);
    // Reset form for next attempt
    this.loginForm.reset();
  }

  hasDisplayableError(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return Boolean(control?.invalid) && (this.isSubmitted || Boolean(control?.touched));
  }
  
}
