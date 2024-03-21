# MERN Stack Messaging Application

This is a simple messaging application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It allows users to send messages to each other in real-time.

## Features

- **User Authentication:** Users can sign up, log in, and log out securely.
- **Real-time Messaging:** Messages are sent and received in real-time using WebSockets.
- **User Profiles:** Users can view and edit their profiles.
- **Message Notifications:** Users receive notifications when they receive new messages.
- **Responsive Design:** The application is designed to work seamlessly across various devices and screen sizes.

## Technologies Used

- **Frontend:** React.js, Redux, Socket.IO, Bootstrap
- **Backend:** Node.js, Express.js, MongoDB, Socket.IO
- **Authentication:** JSON Web Tokens (JWT)
- **Styling:** CSS
- **Deployment:** Heroku for backend, Netlify for frontend

## Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies for both backend and frontend
```
npm install
```
4. Create a `.env` file in the backend directory and add the following environment variables
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```
5. Start the backend server
```
cd ../backend
npm start
```
6. Start the frontend development server
```
cd ../frontend
npm start
```
7. Start Messaging !!
