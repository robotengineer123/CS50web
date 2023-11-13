import { Injectable, signal } from '@angular/core';
import { User } from '../shared/models';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

type LoginResponse = {
  email: string;
  password: string;
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  userSignal = signal<User | null>(null);

  get user() {
    return this.userSignal.asReadonly();
  }

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    this.http
      .post<User>('/api/login', { username: username, password: password })
      .pipe(catchError(this.handleError))
      .subscribe((user) => {
        this.userSignal.set(user);
      });
  }

  logout() {
    this.http.get('/api/logout').subscribe(() => {
      this.userSignal.set(null);
    });
  }

  register(username: string, password: string) {
    this.http
      .post('/api/register', { username: username, password: password })
      .pipe(catchError(this.handleError))
      .subscribe((user) => {});
  }

  handleAuthentication() {}

  private handleError(errorRes: HttpErrorResponse) {
    console.log(errorRes);
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => new Error(errorMessage));
    }
    switch (errorRes.error.error.message) {
      case 'USERNAME_EXISTS':
        errorMessage = 'This username exists already';
        break;
      case 'USERNAME_NOT_FOUND':
        errorMessage = 'This username does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(() => new Error(errorMessage));
  }
}
