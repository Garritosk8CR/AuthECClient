import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registration.component.html',
  styles: []
})

export class RegistrationComponent implements OnInit {
registrationForm: any;

constructor(public formBuilder: FormBuilder) {
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
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  onSubmit() {
    console.log(this.registrationForm.value);
  }
}
