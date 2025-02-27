import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styles: []
})

export class RegistrationComponent implements OnInit {
registrationForm: FormGroup;

constructor(public formBuilder: FormBuilder) {
  this.registrationForm = this.formBuilder.group({
    fullName: [''],
    email: [''],
    password: [''],
    confirmPassword: ['']
  });
}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
