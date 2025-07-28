import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { PostsComponent } from './components/posts/posts.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'users', 
    component: UsersComponent, 
    canActivate: [AuthGuard],
    data: { role: 'admin' }
  },
  { 
    path: 'posts', 
    component: PostsComponent, 
    canActivate: [AuthGuard]
  },
  { 
    path: 'posts/:id', 
    component: PostDetailComponent, 
    canActivate: [AuthGuard]
  },
  { 
    path: 'profile', 
    component: ProfileComponent, 
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
