import { Component, Input } from '@angular/core';
import { Event } from '../models/event';
import { UserService } from '../services/UserService';
import { User } from '../models/User';
import { AuthService } from '../services/AuthService';
import { RegistrationService } from '../services/RegistrationService';
import { FeedbackService } from '../services/FeedbackService';
import { Feedback } from '../models/Feedback';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-event-rating-item',
  templateUrl: './EventRatingItem.component.html',
  styleUrls: ['./EventRatingItem.component.css']
})
export class EventRatingItemComponent {
  @Input() event!: Event;
  organizer: User | null = null;
  rating: number | null = null;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private feedbackService: FeedbackService
  ) {}

  ngOnInit(): void {
    if (this.event.organizer) {
      this.userService.getById(this.event.organizer.userId).subscribe(
        (user) => this.organizer = user,
        (error) => console.error('Failed to load organizer', error)
      );
    } else {
      console.error('Organizer ID is undefined');
    }
  }

  rateEvent(rating: number): void {
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

    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      const feedback: Feedback = {
        event: this.event,
        user: currentUser,
        rating: rating
      };
      this.feedbackService.createFeedback(feedback).subscribe(
        (response) => {
          this.rating = response.rating;
          Swal.fire({
            icon: 'success',
            title: `${rating} stars has been attributed to this event`,
            showConfirmButton: false,
            timer: 1500
          });
        },
        (error) => {
          console.error('Failed to create feedback', error);
          Swal.fire({
            icon: 'error',
            title: 'Feedback failed',
            text: 'Failed to create feedback'
          });
        }
      );
      
    } else {
      console.error('User is not logged in');
    }
  }
}
