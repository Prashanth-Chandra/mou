import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css'],
    standalone: false
})
export class NavigationComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  private userSubscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isUser(): boolean {
    return this.authService.isUser();
  }

  getCurrentUserName(): string {
    return this.currentUser ? `${this.currentUser.firstName} ${this.currentUser.lastName}` : '';
  }

  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }
}
