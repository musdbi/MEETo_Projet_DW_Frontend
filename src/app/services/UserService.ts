import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/User';
import { environment } from '../environment/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environment.apiUrl}users`;

  constructor(private http: HttpClient) { }

  authenticateUser(email: string, password: string): Observable<User> {
    const loginData = { email, password };
    return this.http.post<User>(`${this.apiUrl}/authenticate`, loginData)
      .pipe(
        catchError(this.handleError<User>('authenticateUser'))
      );
  }

  createUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user)
      .pipe(catchError(this.handleError<User>('createUser')));
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError<User[]>('getAll', []))
      );
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError<User>(`getById id=${id}`))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(error);
    };
  }

  delete(user: User): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${user.userId}`)
      .pipe(
        catchError(this.handleError<boolean>('deleteUser'))
      );
  }
}