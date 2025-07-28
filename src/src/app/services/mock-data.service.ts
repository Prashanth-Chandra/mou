import { Injectable } from '@angular/core';
import { User, Post } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  private users: User[] = [
    {
      id: 1,
      firstName: "Alice",
      lastName: "Johnson",
      gender: "female",
      age: 28,
      dob: "1996-02-14",
      phone: "555-1234",
      email: "alice.johnson@example.com",
      role: "admin",
      password: "admin123"
    },
    {
      id: 2,
      firstName: "Bob",
      lastName: "Smith",
      gender: "male",
      age: 32,
      dob: "1992-07-08",
      phone: "555-5678",
      email: "bob.smith@example.com",
      role: "user",
      password: "user123"
    },
    {
      id: 3,
      firstName: "Carol",
      lastName: "Williams",
      gender: "female",
      age: 25,
      dob: "1999-11-23",
      phone: "555-9012",
      email: "carol.williams@example.com",
      role: "user",
      password: "user456"
    }
  ];

  private posts: Post[] = [
    {
      id: 1,
      title: "Welcome to the App",
      content: "This is the first post in our Angular application.",
      authorId: 1,
      createdAt: "2024-06-01T10:00:00Z"
    },
    {
      id: 2,
      title: "Angular Tips",
      content: "Here are some useful tips for working with Angular.",
      authorId: 2,
      createdAt: "2024-06-02T14:30:00Z"
    }
  ];

  constructor() { }

  getUsers(): User[] {
    return [...this.users];
  }

  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  addUser(user: Omit<User, 'id'>): User {
    const newId = Math.max(...this.users.map(u => u.id)) + 1;
    const newUser: User = { ...user, id: newId };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(updatedUser: User): boolean {
    const index = this.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
      return true;
    }
    return false;
  }

  deleteUser(id: number): boolean {
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }

  getPosts(): Post[] {
    return [...this.posts];
  }

  getPostById(id: number): Post | undefined {
    return this.posts.find(post => post.id === id);
  }

  getPostsByAuthor(authorId: number): Post[] {
    return this.posts.filter(post => post.authorId === authorId);
  }

  addPost(post: Omit<Post, 'id' | 'createdAt'>): Post {
    const newId = Math.max(...this.posts.map(p => p.id), 0) + 1;
    const newPost: Post = {
      ...post,
      id: newId,
      createdAt: new Date().toISOString()
    };
    this.posts.push(newPost);
    return newPost;
  }

  deletePost(id: number): boolean {
    const index = this.posts.findIndex(post => post.id === id);
    if (index !== -1) {
      this.posts.splice(index, 1);
      return true;
    }
    return false;
  }
}
