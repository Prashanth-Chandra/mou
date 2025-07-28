import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginCredentials } from '../../models/user.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: false
})
export class LoginComponent {
  credentials: LoginCredentials = {
    email: '',
    password: ''
  };

  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit(): void {
    if (!this.credentials.email || !this.credentials.password) {
      this.errorMessage = 'Please enter both email and password';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.credentials).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        // Redirect based on role
        if (response.user.role === 'admin') {
          this.router.navigate(['/users']);
        } else {
          this.router.navigate(['/posts']);
        }
      },
      error: (error: any) => {
        this.isLoading = false;
        this.errorMessage = 'Invalid email or password';
      }
    });
  }

  // Helper method to fill in demo credentials
  fillDemoCredentials(role: 'admin' | 'user'): void {
    if (role === 'admin') {
      this.credentials.email = 'alice.johnson@example.com';
      this.credentials.password = 'admin123';
    } else {
      this.credentials.email = 'bob.smith@example.com';
      this.credentials.password = 'user123';
    }
  }
}
