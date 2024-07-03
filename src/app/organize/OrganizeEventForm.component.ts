import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EventService } from '../services/EventService';
import { EventCreateInput } from '../models/event';
import { AuthService } from '../services/AuthService';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../models/User';

@Component({
  selector: 'app-event-form',
  templateUrl: './OrganizeEventForm.component.html',
  styleUrls: ['./OrganizeEventForm.component.css']
})
export class OrganizeEventFormComponent {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private eventService: EventService,
    private authService: AuthService
  ) {}

  newEventInput!: EventCreateInput;

  eventForm = this.formBuilder.group({
    name: ['', {
      validators: [Validators.required, Validators.minLength(5), Validators.maxLength(150)],
    }],
    address: ['', Validators.required],
    city: ['', Validators.required],
    pincode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
    description: ['', {
      validators: [Validators.required, Validators.maxLength(200)],
    }],
    startEvent: ['', Validators.required],
    endEvent: ['', Validators.required]
  }, { validator: this.startBeforeEndValidator });

  get name() {
    return this.eventForm.controls['name'];
  }

  get address() {
    return this.eventForm.controls['address'];
  }

  get city() {
    return this.eventForm.controls['city'];
  }

  get pincode() {
    return this.eventForm.controls['pincode'];
  }

  get description() {
    return this.eventForm.controls['description'];
  }

  get startEvent() {
    return this.eventForm.controls['startEvent'];
  }

  get endEvent() {
    return this.eventForm.controls['endEvent'];
  }

  startBeforeEndValidator(group: FormGroup): { [key: string]: boolean } | null {
    const start = group.get('startEvent')?.value;
    const end = group.get('endEvent')?.value;
    return start && end && start >= end ? { 'startBeforeEnd': true } : null;
  }

  onSubmit() {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });

    if (this.eventForm.invalid) {
      Toast.fire({
        icon: "error",
        title: "Please correct the errors before submitting"
      });
    } else {
      const currentUser = this.authService.getCurrentUser();
      this.newEventInput = {
        name: this.eventForm.value.name ?? '',
        address: this.eventForm.value.address ?? '',
        city: this.eventForm.value.city ?? '',
        pincode: this.eventForm.value.pincode ?? '',
        description: this.eventForm.value.description ?? '',
        startEvent: this.eventForm.value.startEvent ?? '',
        endEvent: this.eventForm.value.endEvent ?? '',
        organizer: currentUser ?? {} as User
      };

      this.eventService.create(this.newEventInput).subscribe(() => {
        this.router.navigate(['/']).then((r) => console.log(r));
      });

      Toast.fire({
        icon: "success",
        title: "Event Submitted"
      });
    }
  }

  onCancel() {
    Swal.fire({
      title: 'Are you sure you want to cancel your masterpiece?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.eventForm.reset();
        this.router.navigate(['/']).then((r) => console.log(r));
      }
    });
  }
}
