import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiIntegrationService {

  constructor(private authService: AuthService) { }

  /**
   * Enable API mode for authentication using dummyjson.com
   * This switches the app from mock data to real API integration
   */
  enableApiMode(): void {
    this.authService.enableApiMode();
    console.log('API mode enabled. Now using dummyjson.com for authentication.');
  }

  /**
   * Disable API mode and return to mock data
   */
  disableApiMode(): void {
    this.authService.disableApiMode();
    console.log('API mode disabled. Now using mock data for authentication.');
  }

  /**
   * Check if API mode is currently enabled
   */
  isApiModeEnabled(): boolean {
    return (this.authService as any).isApiMode;
  }

  /**
   * Get API configuration details
   */
  getApiConfig() {
    return {
      baseUrl: 'https://dummyjson.com',
      endpoints: {
        login: '/auth/login',
        me: '/auth/me',
        users: '/users',
        posts: '/posts'
      },
      description: 'DummyJSON provides free fake REST API for testing and prototyping'
    };
  }
}
