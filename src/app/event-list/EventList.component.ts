import { Component, OnInit } from '@angular/core';
import { Event } from '../models/event';
import { EventService } from '../services/EventService';
import { AuthService } from '../services/AuthService';

@Component({
  selector: 'app-event-list',
  templateUrl: './EventList.component.html',
  styleUrls: ['./EventList.component.css']
})
export class EventListComponent implements OnInit {

  events: Event[] = [];

  constructor(private eventService: EventService, private authService: AuthService) {}

  loadEvents(): void {
    this.eventService.getAll().subscribe(events => {
      this.events = events.reverse();
    });
  }

  ngOnInit(): void {
    this.loadEvents();
  }

}
