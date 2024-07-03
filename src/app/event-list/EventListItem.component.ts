import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../models/event';
import { UserService } from '../services/UserService';
import { User } from '../models/User';
import { AuthService } from '../services/AuthService';
import { RegistrationService } from '../services/RegistrationService';
import Swal from 'sweetalert2';
import { Registration } from '../models/Registration';

@Component({
  selector: 'app-event-list-item',
  templateUrl: './EventListItem.component.html',
  styleUrls: ['./EventListItem.component.css']
})
export class EventListItemComponent implements OnInit {
  @Input() event!: Event;
  organizer: User | null = null;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private registrationService: RegistrationService
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

  participate(): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      Swal.fire({
        icon: 'error',
        title: 'Please log in to participate in this event',
      });
      return;
    }
  
    this.registrationService.isUserRegistered(currentUser.userId, this.event.eventId).subscribe(
      (isRegistered) => {
        if (isRegistered) {
          Swal.fire({
            icon: 'info',
            title: 'You are already registered for this event !',
          });
        } else {
          const registration: Registration = {
            event: this.event,
            user: currentUser
          };
          this.registrationService.create(registration).subscribe(
            () => {
              Swal.fire({
                icon: 'success',
                title: 'You have successfully registered for the event !',
                showConfirmButton: false,
                timer: 1500
              });
            },
            (error: any) => {
              console.error('Failed to register for event', error);
              Swal.fire({
                icon: 'error',
                title: 'Failed to register for the event !',
              });
            }
          );
        }
      },
      (error: any) => {
        console.error('Failed to check if the user is registered', error);
        Swal.fire({
          icon: 'error',
          title: 'Failed to check if the user is registered !',
        });
      }
    );
  } 
}