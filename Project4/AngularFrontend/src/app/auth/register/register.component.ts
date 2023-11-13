import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { AuthFormComponent } from '../auth-form/auth-form.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, AuthFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private auth: AuthService) {}

  register(event: { username: string; password: string }) {
    this.auth.register(event.username, event.password);
  }
}
