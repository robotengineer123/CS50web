import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthFormComponent } from '../auth-form/auth-form.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, AuthFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private auth: AuthService) {}

  login(event: { username: string; password: string }) {
    this.auth.login(event.username, event.password);
  }
}
