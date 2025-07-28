export interface User {
  id: number;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female';
  age: number;
  dob: string;
  phone: string;
  email: string;
  role: 'admin' | 'user';
  password: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
