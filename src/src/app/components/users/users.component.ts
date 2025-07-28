import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { MockDataService } from '../../services/mock-data.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css'],
    standalone: false
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  showAddForm: boolean = false;
  newUser: Omit<User, 'id'> = {
    firstName: '',
    lastName: '',
    gender: 'male',
    age: 0,
    dob: '',
    phone: '',
    email: '',
    role: 'user',
    password: ''
  };

  constructor(
    private mockDataService: MockDataService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.users = this.mockDataService.getUsers();
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      if (this.mockDataService.deleteUser(id)) {
        this.loadUsers();
      }
    }
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.resetForm();
    }
  }

  addUser(): void {
    if (this.isFormValid()) {
      this.mockDataService.addUser(this.newUser);
      this.loadUsers();
      this.resetForm();
      this.showAddForm = false;
    }
  }

  resetForm(): void {
    this.newUser = {
      firstName: '',
      lastName: '',
      gender: 'male',
      age: 0,
      dob: '',
      phone: '',
      email: '',
      role: 'user',
      password: ''
    };
  }

  isFormValid(): boolean {
    return !!(
      this.newUser.firstName &&
      this.newUser.lastName &&
      this.newUser.email &&
      this.newUser.password &&
      this.newUser.age > 0 &&
      this.newUser.phone &&
      this.newUser.dob
    );
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
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
    if (this.newUser.dob) {
      this.newUser.age = this.calculateAge(this.newUser.dob);
    }
  }
}
