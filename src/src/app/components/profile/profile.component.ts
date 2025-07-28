import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { MockDataService } from '../../services/mock-data.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    standalone: false
})
export class ProfileComponent implements OnInit {
  currentUser: User | null = null;
  editableUser: User | null = null;
  isEditing: boolean = false;
  originalUser: User | null = null;

  constructor(
    private authService: AuthService,
    private mockDataService: MockDataService
  ) { }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      // Get the latest user data from mock service
      const freshUserData = this.mockDataService.getUserById(this.currentUser.id);
      if (freshUserData) {
        this.currentUser = freshUserData;
      }
    }
  }

  startEditing(): void {
    if (this.currentUser) {
      this.originalUser = { ...this.currentUser };
      this.editableUser = { ...this.currentUser };
      this.isEditing = true;
    }
  }

  cancelEditing(): void {
    this.editableUser = null;
    this.originalUser = null;
    this.isEditing = false;
  }

  saveChanges(): void {
    if (this.editableUser && this.isFormValid()) {
      // Calculate age from date of birth
      if (this.editableUser.dob) {
        this.editableUser.age = this.calculateAge(this.editableUser.dob);
      }

      // Update in mock data service (in-memory only)
      this.mockDataService.updateUser(this.editableUser);
      
      // Update current user in auth service
      this.currentUser = { ...this.editableUser };
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      
      this.cancelEditing();
    }
  }

  isFormValid(): boolean {
    if (!this.editableUser) return false;
    
    return !!(
      this.editableUser.firstName?.trim() &&
      this.editableUser.lastName?.trim() &&
      this.editableUser.email?.trim() &&
      this.editableUser.phone?.trim() &&
      this.editableUser.dob &&
      this.editableUser.age > 0
    );
  }

  calculateAge(dob: string): number {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }

  onDobChange(): void {
    if (this.editableUser?.dob) {
      this.editableUser.age = this.calculateAge(this.editableUser.dob);
    }
  }

  hasChanges(): boolean {
    if (!this.originalUser || !this.editableUser) return false;
    
    return JSON.stringify(this.originalUser) !== JSON.stringify(this.editableUser);
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // dd/mm/yyyy format
  }
}
