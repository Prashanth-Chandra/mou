import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post, User } from '../../models/user.model';
import { MockDataService } from '../../services/mock-data.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css'],
    standalone: false
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  users: User[] = [];
  currentFilter: 'all' | 'my' = 'all';
  showAddForm: boolean = false;
  currentUser: User | null = null;

  newPost = {
    title: '',
    content: ''
  };

  constructor(
    private mockDataService: MockDataService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadData();
  }

  loadData(): void {
    this.posts = this.mockDataService.getPosts();
    this.users = this.mockDataService.getUsers();
    this.applyFilter();
  }

  applyFilter(): void {
    if (this.currentFilter === 'all') {
      this.filteredPosts = [...this.posts];
    } else if (this.currentFilter === 'my' && this.currentUser) {
      this.filteredPosts = this.posts.filter(post => post.authorId === this.currentUser!.id);
    }
  }

  setFilter(filter: 'all' | 'my'): void {
    this.currentFilter = filter;
    this.applyFilter();
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.resetForm();
    }
  }

  addPost(): void {
    if (this.isFormValid() && this.currentUser) {
      this.mockDataService.addPost({
        title: this.newPost.title,
        content: this.newPost.content,
        authorId: this.currentUser.id
      });
      this.loadData();
      this.resetForm();
      this.showAddForm = false;
    }
  }

  resetForm(): void {
    this.newPost = {
      title: '',
      content: ''
    };
  }

  isFormValid(): boolean {
    return !!(this.newPost.title.trim() && this.newPost.content.trim());
  }

  getAuthorName(authorId: number): string {
    const author = this.users.find(user => user.id === authorId);
    return author ? `${author.firstName} ${author.lastName}` : 'Unknown Author';
  }

  viewPostDetails(postId: number): void {
    this.router.navigate(['/posts', postId]);
  }

  canCreatePost(): boolean {
    return !!this.currentUser;
  }

  deletePost(postId: number): void {
    if (confirm('Are you sure you want to delete this post?')) {
      this.mockDataService.deletePost(postId);
      this.loadData();
    }
  }

  canDeletePost(post: Post): boolean {
    return this.currentUser?.id === post.authorId || this.authService.isAdmin();
  }
}
