import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/AuthService';
import Swal from 'sweetalert2';
import { User } from '../models/User';

@Component({
  selector: 'app-register-page',
  templateUrl: './RegisterForm.component.html',
  styleUrls: ['./RegisterForm.component.css']
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pswd: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      contactNo: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  get userName() {
    return this.registerForm.get('userName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get pswd() {
    return this.registerForm.get('pswd');
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get dateOfBirth() {
    return this.registerForm.get('dateOfBirth');
  }

  get contactNo() {
    return this.registerForm.get('contactNo');
  }

  onSignup() {
    if (this.registerForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid input',
        text: 'Please fill in all fields correctly.'
      });
      return;
    }

    const newUser: Partial<User> = {
      userName: this.registerForm.value.userName,
      email: this.registerForm.value.email,
      pswd: this.registerForm.value.pswd,
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      dateOfBirth: new Date(this.registerForm.value.dateOfBirth),
      contactNo: this.registerForm.value.contactNo,
      registrationDate: new Date()
    };

    this.authService.signup(newUser).subscribe(user => {
      if (user) {
        Swal.fire({
          icon: 'success',
          title: 'Signup successful',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.router.navigate(['/']);
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Signup failed',
          text: 'An error occurred during signup'
        });
      }
    });
  }
}
