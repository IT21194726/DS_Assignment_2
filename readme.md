# Educational Platform for Online Learning

This project is an educational platform similar to Coursera or Udemy, designed to offer a wide range of courses to learners. It features a web/mobile interface for course browsing and enrollment, a course management service for instructors, and a learner service for tracking course progress.

## Features

- **Web/Mobile Interface**: Allows learners to browse, enroll in, and access courses across various devices.
- **Course Management Service**: Enables instructors to add, update, and delete course content and monitor learner progress.
- **Learner Service**: Provides functionalities for learners to enroll in courses, track their progress, and cancel enrollments if necessary.
- **Payment Integration**: Uses external third-party services like PayHere for processing course enrollment payments.
- **Confirmation and Notification**: Sends confirmation via SMS and email upon successful course enrollment.

## Technologies Used

- Backend: RESTful web services using Microservices architecture.
- Orchestration/Integration: Docker and Kubernetes.
- Frontend: Asynchronous web client using a JavaScript framework (React/Angular).

## Setup and Deployment

1. **Clone the Repository**: `git clone https://github.com/yourusername/yourrepositoryname.git`
2. **Navigate to the project directory**: `cd yourrepositoryname`
3. **Install Dependencies**: `npm install`
4. **Start the Application**:
   - Backend: `npm run start-backend`
   - Frontend: `npm run start-frontend`
5. **Visit the Application**: Open `http://localhost:3000` in your browser to view the platform.

## Security

This project implements robust authentication and security mechanisms to manage access for three different user roles: learner, course instructor, and system admin.

## Additional Documentation

- Architectural Diagrams
- API Documentation
- Workflow Descriptions

## Contributors

- List of contributors along with their contributions

## Acknowledgments

- Acknowledge any third-party code or resources used in the project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details.
