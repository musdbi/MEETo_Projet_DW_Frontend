import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { AuthService } from '../services/AuthService';
import { User } from '../models/User';
import { RegistrationService } from '../services/RegistrationService';
import { Event } from '../models/event';

@Component({
  selector: 'app-profile',
  templateUrl: './ProfileForm.component.html',
  styleUrls: ['./ProfileForm.component.css']
})
export class ProfileFormComponent implements OnInit {
  user: User | null = null;
  registeredEvents: Event[] = [];

  constructor(private authService: AuthService, private registrationService: RegistrationService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    if (this.user) {
      this.registrationService.getEventsByUserId(this.user.userId).subscribe(
        (events: Event[]) => {
          this.registeredEvents = events;
        },
        error => console.error('Failed to load registered events', error)
      );
    }
  }

  hasRegisteredEvents(): boolean {
    return this.registeredEvents.length > 0;
  }

  goToRateEvents(): void {
    this.router.navigate(['/feedbacks']);
  }
}
