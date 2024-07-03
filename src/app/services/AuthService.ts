import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/User';
import { UserService } from './UserService';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | null = null;

  constructor(private userService: UserService, private router: Router) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    }
  }

  login(email: string, password: string): Observable<User | null> {
    if (!email || !password) {
      Swal.fire({
          icon: 'error',
          title: 'Login failed',
          text: 'Email or password is missing'
      });
      return of(null);
  }
    return this.userService.authenticateUser(email, password).pipe(
      map(user => {
        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        Swal.fire({
          icon: 'success',
          title: 'Login successful',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/']);
        return user;
      }),
      catchError(error => {
        console.error('Login error', error);
        Swal.fire({
          icon: 'error',
          title: 'Login failed',
          text: 'Invalid email or password'
        });
        return throwError(error);
      })
    );
  }

  signup(user: Partial<User>): Observable<User> {
    return this.userService.createUser(user).pipe(
      map(user => {
        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        Swal.fire({
          icon: 'success',
          title: 'Signup successful',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/']);
        return user;
      }),
      catchError(error => {
        console.error('Signup error', error);
        Swal.fire({
          icon: 'error',
          title: 'Signup failed',
          text: 'An error occurred during signup'
        });
        return throwError(error);
      })
    );
  }

  isLoggedIn(): boolean {
    if (!this.currentUser) {
      const storedUser = localStorage.getItem('currentUser');
      this.currentUser = storedUser ? JSON.parse(storedUser) : null;
    }
    return !!this.currentUser;
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
    Swal.fire({
      icon: 'success',
      title: 'Logout successful',
      showConfirmButton: false,
      timer: 1500
    });
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
}