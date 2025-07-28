<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Angular User Management System - Copilot Instructions

This is an Angular application with the following features:
- User authentication (login)
- Role-based access (admin/user)
- User and post management (list, create, delete)
- Profile management
- API integration capabilities

## Project Structure

- **Components**: Login, Users, Posts, Post Details, Profile, Navigation
- **Services**: AuthService, MockDataService
- **Guards**: AuthGuard for route protection
- **Pipes**: CustomDatePipe for formatting dates to dd/mm/yyyy
- **Directives**: ShowIfRoleDirective for conditional rendering
- **Models**: User and Post interfaces

## Key Implementation Details

- Uses Template Driven Forms for user input
- Role-based routing and access control
- In-memory data management with mock data
- Custom pipes for date formatting
- Custom directives for conditional rendering
- Responsive design with mobile navigation
- API integration ready (dummyjson.com for authentication)

## Coding Standards

- Use TypeScript strict mode
- Follow Angular style guide
- Implement proper error handling
- Use RxJS observables for async operations
- Maintain responsive design principles
- Include proper form validations
