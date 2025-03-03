import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { FirstKeyPipe } from '../../shared/pipes/first-key.pipe';
import { AuthService } from '../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule, CommonModule, FirstKeyPipe, RouterLink],
  templateUrl: './registration.component.html',
  styles: []
})

export class RegistrationComponent implements OnInit {
registrationForm: any;
isSubmitted: boolean = false;

constructor(
  public formBuilder: FormBuilder, 
  private service: AuthService, 
  private toastr: ToastrService,
  private router: Router
) {
  this.registrationForm = this.formBuilder.group({
    fullName: ['', Validators.required],
    email: ['',[Validators.required,Validators.email]],
    password: ['',[Validators.required, Validators.minLength(6), Validators.pattern(/(?=.*[^a-zA-Z0-9 ])/)]],
    confirmPassword: ['']
  },{validators: this.passwordMatchValidator});
}

  passwordMatchValidator:ValidatorFn = (control: AbstractControl):null => {
    const password = control.get('password')
    const confirmPassword = control.get('confirmPassword');
    (password && confirmPassword && password.value != confirmPassword.value)  ? 
    confirmPassword?.setErrors({passwordMismatch: true}) : confirmPassword?.setErrors(null);
    return null;
  }

  hasDisplayableError(controlName: string): boolean {
    const control = this.registrationForm.get(controlName);
    return Boolean(control?.invalid) && (this.isSubmitted || Boolean(control?.touched));
  }

  ngOnInit(): void {
    if(this.service.isLoggedIn()) {
     this.router.navigateByUrl('/dashboard');  // Redirect to dashboard if already logged in
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.registrationForm.invalid) {
      this.service.createUser(this.registrationForm.value)
      .subscribe({
        next: (res: any) => {
          if (res.succeeded) {
            this.registrationForm.reset();
            this.isSubmitted = false;
            this.toastr.success('User created successfully');
            console.log(res, 'User created successfully');
          } else {
            
          }      
        },
        error: (err) => {
          err.error.errors.forEach((element: any) => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('Username is already taken');
                break;
              case 'DuplicateEmail':
                this.toastr.error('Email is already taken');
                break;
              default:
                this.toastr.error(element.description);
                break;
            }
          });
        },
      })
    }   
  }
}
