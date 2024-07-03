import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/AuthService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-form',
  templateUrl: './LoginForm.component.html',
  styleUrls: ['./LoginForm.component.css']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  get email(): AbstractControl | null {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  onLogin() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });

    if (this.loginForm.invalid) {
      Toast.fire({
        icon: 'error',
        title: 'Please check the errors'
      });
      return;
    }

    if (this.loginForm.value.password == null) {
      Toast.fire({
        icon: 'error',
        title: 'Password cannot be null'
      });
      return;
    }

    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(user => {
      if (user) {
        Swal.fire({
          icon: 'success',
          title: 'Login successful',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/']);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login failed',
          text: 'Invalid email or password'
        });
      }
    });
  }
}
