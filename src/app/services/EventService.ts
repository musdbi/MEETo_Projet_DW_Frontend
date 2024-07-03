import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Event } from '../models/event';
import { environment } from '../environment/environment';
import { EventCreateInput } from '../models/event';
import { AuthService } from '../services/AuthService';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  
  private apiUrl = `${environment.apiUrl}events`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAll(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError<Event[]>('getAll', []))
      );
  }

  getById(id: string): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError<Event>(`getById id=${id}`))
      );
  }  

  create(event: EventCreateInput): Observable<Event> {
    const currentUser = this.authService.getCurrentUser();
    const headers = new HttpHeaders().set('User-Id', currentUser?.userId ?? '');
    return this.http.post<Event>(this.apiUrl, event, { headers })
      .pipe(
        catchError(this.handleError<Event>('create'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(error);
    };
  }

  delete(event: Event): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${event.eventId}`)
  }
}
