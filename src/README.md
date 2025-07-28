# Angular User Management System

A comprehensive Angular application featuring user authentication, role-based access control, and content management capabilities.

## Features

### 🔐 Authentication
- User login with email/password
- Role-based authentication (Admin/User)
- Route protection with guards
- Session management with localStorage

### 👥 User Management (Admin Only)
- View all users in a table format
- Add new users with comprehensive form validation
- Delete existing users
- User profiles with detailed information

### 📝 Post Management
- View all posts or filter by "My Posts"
- Create new posts with rich content
- View detailed post information
- Delete posts (own posts or admin)
- Custom date formatting (dd/mm/yyyy)

### 👤 Profile Management
- View personal profile information
- Edit profile details with real-time validation
- Age calculation from date of birth
- In-memory state management

## Technical Implementation

### 🏗️ Architecture
- **Framework**: Angular 17
- **Routing**: Angular Router with guards
- **Forms**: Template Driven Forms
- **Styling**: Custom CSS with responsive design
- **State Management**: Services with RxJS Observables

### 🎨 Custom Features
- **CustomDatePipe**: Formats dates to dd/mm/yyyy format
- **ShowIfRoleDirective**: Conditional rendering based on user roles
- **AuthGuard**: Protects routes based on authentication and roles
- **Responsive Navigation**: Desktop and mobile-optimized navigation

### 📱 Responsive Design
- Mobile-first approach
- Adaptive navigation for different screen sizes
- Touch-friendly interface
- Grid layouts that adjust to screen size

## Milestones

### ✅ Milestone 1: Basic App Structure
- Login page with form validation
- User list page with table display
- Posts list page with filtering
- Post details page with author information
- Custom date pipe implementation
- Custom directives for conditional rendering

### ✅ Milestone 2: Role-Based Access and CRUD Operations
- Admin role: Full user and post management
- User role: Post creation and "My Posts" filtering
- CRUD operations for users and posts
- Role-based navigation and permissions

### ✅ Milestone 3: Profile Management
- Complete profile viewing and editing
- Form validation and error handling
- In-memory state management
- Age calculation from date of birth

### 🚀 Milestone 4: API Integration (Ready)
- Integration with dummyjson.com for authentication
- Token-based authentication
- API service architecture prepared
- Environment-based configuration

## Demo Credentials

### Admin Access
- **Email**: alice.johnson@example.com
- **Password**: admin123

### User Access
- **Email**: bob.smith@example.com
- **Password**: user123

Alternative User:
- **Email**: carol.williams@example.com
- **Password**: user456

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)
- Angular CLI (v17)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm start
   # or
   ng serve
   ```

3. **Open browser**
   Navigate to `http://localhost:4200`

### Build for Production

```bash
npm run build
# or
ng build --prod
```

## Project Structure

```
src/
├── app/
│   ├── components/           # All Angular components
│   │   ├── login/           # Login component
│   │   ├── users/           # User management
│   │   ├── posts/           # Posts listing
│   │   ├── post-detail/     # Post details
│   │   ├── profile/         # User profile
│   │   └── navigation/      # Navigation component
│   ├── services/            # Business logic services
│   │   ├── auth.service.ts  # Authentication service
│   │   └── mock-data.service.ts # Data management
│   ├── guards/              # Route guards
│   │   └── auth.guard.ts    # Authentication guard
│   ├── models/              # TypeScript interfaces
│   │   └── user.model.ts    # User and Post models
│   ├── pipes/               # Custom pipes
│   │   └── custom-date.pipe.ts # Date formatting
│   ├── directives/          # Custom directives
│   │   └── show-if-role.directive.ts # Conditional rendering
│   ├── app-routing.module.ts # Routing configuration
│   ├── app.module.ts        # Main module
│   └── app.component.*      # Root component
├── styles.css               # Global styles
└── index.html              # Main HTML file
```

## Key Technologies & Concepts Implemented

### Angular Core Concepts
- **Components**: Modular, reusable UI components
- **Services**: Business logic and data management
- **Dependency Injection**: Service injection and management
- **Routing**: Navigation and route protection
- **Forms**: Template-driven forms with validation
- **Pipes**: Custom data transformation
- **Directives**: Custom DOM manipulation

### Advanced Features
- **Guards**: Route protection and authorization
- **Observables**: Reactive programming with RxJS
- **HTTP Client**: Ready for API integration
- **Local Storage**: Session persistence
- **Responsive Design**: Mobile-first approach

## API Integration (Milestone 4)

The application is prepared for API integration with dummyjson.com:

```typescript
// Enable API mode in AuthService
authService.enableApiMode();
```

### Supported API Endpoints
- **Authentication**: POST /auth/login
- **User Data**: Automatic user profile creation
- **Token Management**: JWT token handling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Screenshots

### Login Page
- Clean, responsive login form
- Demo credential buttons for easy testing
- Form validation with error messages

### Admin Dashboard
- User management table with full CRUD operations
- Add user form with comprehensive validation
- Role-based navigation

### Posts Management
- Filter between "All Posts" and "My Posts"
- Create new posts with rich content
- Post details with author information

### Profile Management
- View and edit personal information
- Real-time form validation
- Age calculation from date of birth

---

**Note**: This application demonstrates comprehensive Angular development skills including component architecture, routing, forms, services, guards, pipes, directives, and responsive design principles.
