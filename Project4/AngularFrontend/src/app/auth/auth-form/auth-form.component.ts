import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.css',
})
export class AuthFormComponent {
  @Input({ required: true }) submitName!: string;
  @Output() onSubmit = new EventEmitter<{
    username: string;
    password: string;
  }>();

  constructor(private auth: AuthService) {}

  Submit(form: NgForm) {
    const username = form.value.username;
    const password = form.value.password;
    const payload = { username: username, password: password };
    this.onSubmit.emit(payload);
  }
}
