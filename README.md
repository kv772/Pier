# Pier

A web platform connecting first-generation college applicants with mentors and resources to support their college application journey.

## Overview

The First-Gen Mentorship Platform is designed to bridge the gap between first-generation college applicants and experienced mentors who can guide them through the college application process. The platform provides a user-friendly interface built with React for the frontend and utilizes Firebase for data storage, with Flask serving as the backend API.

## Features

### For Students
- Profile creation and management
- Mentor matching system
- Resource library for college applications
- Direct messaging with assigned mentors
- Progress tracking for application milestones

### For Mentors
- Mentor profile creation and verification
- Student matching dashboard
- Resource sharing capabilities
- Communication tools for student guidance
- Progress tracking for mentees

## Technologies Used

- **Frontend:**
  - React.js
  - React Router for navigation

- **Backend:**
  - Flask (Python)
  - Firebase Realtime Database
  - Firebase Authentication

## Setup and Installation

1. **Clone the Repository**
   ```bash
   git clone [your-repository-url]
   cd [repository-name]
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```

3. **Backend Setup**
   ```bash
   cd backend
   pip install -r requirements.txt
   flask run
   ```

4. **Firebase Configuration**
   - Create a Firebase project
   - Add your Firebase configuration to `src/config/firebase.js`
   ```javascript
   const firebaseConfig = {
     // Your Firebase credentials
   };
   ```

## Environment Variables

Create a `.env` file in the root directory and add:

```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
FLASK_APP=app.py
FLASK_ENV=development
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

- Thanks to all mentors who volunteer their time
- First-generation students who provided feedback
