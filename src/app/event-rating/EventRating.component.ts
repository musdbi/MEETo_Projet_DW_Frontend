import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/AuthService';
import { RegistrationService } from '../services/RegistrationService';
import { Event } from '../models/event';

@Component({
  selector: 'app-event-rating',
  templateUrl: './EventRating.component.html',
  styleUrls: ['./EventRating.component.css']
})
export class EventRatingComponent implements OnInit {
  registeredEvents: Event[] = [];

  constructor(private authService: AuthService, private registrationService: RegistrationService) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.registrationService.getEventsByUserId(user.userId).subscribe(
        (events: Event[]) => {
          const now = Date.now();
          this.registeredEvents = events.filter(event => new Date(event.endEvent).getTime() < now);
        },
        error => console.error('Failed to load registered events', error)
      );
    }
  }
}
