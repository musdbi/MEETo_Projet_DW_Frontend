import { Component } from '@angular/core';
import { AuthService } from '../services/AuthService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private authService: AuthService) {}

  handleNavigation(targetUrl: string): void {
    if (this.authService.isLoggedIn()) {
      window.location.href = targetUrl;
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Not logged in',
        text: 'Please log in to access this page.',
        showConfirmButton: true
      });
    }
  }
}
