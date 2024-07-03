import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Registration } from '../models/Registration';
import { environment } from '../environment/environment';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private apiUrl = `${environment.apiUrl}registrations`;

  constructor(private http: HttpClient) { }

  create(registration: Registration): Observable<any> {
    return this.http.post<any>(this.apiUrl, registration)
      .pipe(
        catchError(this.handleError<any>('createRegistration'))
      );
  }
  
  isUserRegistered(userId: string, eventId: string): Observable<boolean> {
    return this.http.get<Registration[]>(`${this.apiUrl}/user/${userId}`).pipe(
      map(registrations => registrations.some(registration => registration.event.eventId === eventId)),
      catchError(error => {
        console.error('Failed to check if the user is registered', error);
        return throwError(error);
      })
    );
  }
  

  getEventsByUserId(userId: string): Observable<Event[]> {
    return this.http.get<Registration[]>(`${this.apiUrl}/user/${userId}`).pipe(
      map(registrations => registrations.map(registration => registration.event))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(error);
    };
  }
}
