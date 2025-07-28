import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post, User } from '../../models/user.model';
import { MockDataService } from '../../services/mock-data.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-post-detail',
    templateUrl: './post-detail.component.html',
    styleUrls: ['./post-detail.component.css'],
    standalone: false
})
export class PostDetailComponent implements OnInit {
  post: Post | null = null;
  author: User | null = null;
  currentUser: User | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mockDataService: MockDataService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadPost();
  }

  loadPost(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.post = this.mockDataService.getPostById(id) || null;
      if (this.post) {
        this.author = this.mockDataService.getUserById(this.post.authorId) || null;
      } else {
        // Post not found, redirect to posts
        this.router.navigate(['/posts']);
      }
    } else {
      this.router.navigate(['/posts']);
    }
  }

  goBack(): void {
    this.router.navigate(['/posts']);
  }

  deletePost(): void {
    if (this.post && confirm('Are you sure you want to delete this post?')) {
      if (this.mockDataService.deletePost(this.post.id)) {
        this.router.navigate(['/posts']);
      }
    }
  }

  canDeletePost(): boolean {
    if (!this.post || !this.currentUser) return false;
    return this.currentUser.id === this.post.authorId || this.authService.isAdmin();
  }

  getAuthorName(): string {
    return this.author ? `${this.author.firstName} ${this.author.lastName}` : 'Unknown Author';
  }
}
