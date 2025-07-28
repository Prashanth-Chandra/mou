import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isLoggedIn()) {
      // Check if route requires specific role
      const requiredRole = route.data['role'];
      if (requiredRole) {
        const currentUser = this.authService.getCurrentUser();
        if (currentUser?.role === requiredRole) {
          return true;
        } else {
          // Redirect to unauthorized page or posts
          this.router.navigate(['/posts']);
          return false;
        }
      }
      return true;
    }

    // Not logged in, redirect to login
    this.router.navigate(['/login']);
    return false;
  }
}
