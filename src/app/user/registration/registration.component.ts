import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { FirstKeyPipe } from '../../shared/pipes/first-key.pipe';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule, CommonModule, FirstKeyPipe],
  templateUrl: './registration.component.html',
  styles: []
})

export class RegistrationComponent implements OnInit {
registrationForm: any;
isSubmitted: boolean = false;
constructor(public formBuilder: FormBuilder, private service: AuthService) {
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
    throw new Error('Method not implemented.');
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
          }
          console.log(res, 'User created successfully')
        },
        error: (error) => {
          console.log(error);
        },
      })
    }   
  }
}
