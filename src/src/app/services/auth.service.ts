import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { User, AuthResponse, LoginCredentials } from '../models/user.model';
import { MockDataService } from './mock-data.service';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private isApiMode = false; // Switch to true for Milestone 4

  constructor(
    private mockDataService: MockDataService,
    private http: HttpClient
  ) {
    // Check if user is already logged in (from localStorage)
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('currentUser');
    if (token && userData) {
      this.currentUserSubject.next(JSON.parse(userData));
    }
  }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    if (this.isApiMode) {
      return this.loginWithApi(credentials);
    } else {
      return this.loginWithMockData(credentials);
    }
  }

  private loginWithMockData(credentials: LoginCredentials): Observable<AuthResponse> {
    const users = this.mockDataService.getUsers();
    const user = users.find(u => 
      u.email === credentials.email && u.password === credentials.password
    );

    if (user) {
      const authResponse: AuthResponse = { user, token: 'mock-jwt-token' };
      localStorage.setItem('token', authResponse.token!);
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return of(authResponse);
    } else {
      return throwError(() => new Error('Invalid credentials'));
    }
  }

  private loginWithApi(credentials: LoginCredentials): Observable<AuthResponse> {
    const loginData = {
      username: credentials.email.split('@')[0], // Extract username from email
      password: credentials.password
    };

    return this.http.post<any>('https://dummyjson.com/auth/login', loginData)
      .pipe(
        map(response => {
          const user: User = {
            id: response.id,
            firstName: response.firstName,
            lastName: response.lastName,
            gender: response.gender,
            age: response.age,
            dob: response.birthDate,
            phone: response.phone,
            email: response.email,
            role: response.id === 1 ? 'admin' : 'user', // Assume user with id 1 is admin
            password: '' // Don't store password
          };

          const authResponse: AuthResponse = { user, token: response.token };
          localStorage.setItem('token', response.token);
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return authResponse;
        }),
        catchError(error => {
          return throwError(() => new Error('Invalid credentials'));
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }

  isUser(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'user';
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  enableApiMode(): void {
    this.isApiMode = true;
  }

  disableApiMode(): void {
    this.isApiMode = false;
  }
}
