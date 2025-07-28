import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Components
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { PostsComponent } from './components/posts/posts.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NavigationComponent } from './components/navigation/navigation.component';

// Services
import { AuthService } from './services/auth.service';
import { MockDataService } from './services/mock-data.service';

// Guards
import { AuthGuard } from './guards/auth.guard';

// Pipes
import { CustomDatePipe } from './pipes/custom-date.pipe';

// Directives
import { ShowIfRoleDirective } from './directives/show-if-role.directive';

@NgModule({ declarations: [
        AppComponent,
        LoginComponent,
        UsersComponent,
        PostsComponent,
        PostDetailComponent,
        ProfileComponent,
        NavigationComponent,
        CustomDatePipe,
        ShowIfRoleDirective
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        FormsModule], providers: [
        AuthService,
        MockDataService,
        AuthGuard,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
