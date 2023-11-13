import { Component, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { User } from '../shared/models';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  user: Signal<User | null>;
  constructor(private auth: AuthService) {
    this.user = auth.user;
  }

  onLogout() {
    this.auth.logout();
  }
}
