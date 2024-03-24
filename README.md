# Timely: Task Manager Todo App 🕒📝
Timely is a feature-rich task manager todo app designed to streamline your productivity. With secure user authentication using JWT, you can confidently manage your tasks with ease.

## About the Project 🕒💡
The project "Timely" is a comprehensive task manager and todo app designed to elevate your productivity and task management experience. Built with a focus on user-friendly features and robust functionality, Timely empowers users to efficiently organize, track, and complete tasks with ease.

The user interface of Timely is intuitively designed to provide a seamless task management experience. Users can effortlessly create, edit, and delete tasks, categorize them, mark them as completed or incomplete, and prioritize important tasks by starring them. ⭐

One of the standout features of Timely is its deadline management capabilities. Users can set deadlines for tasks and receive timely email reminders to stay on track. This feature helps users stay organized and focused on meeting important deadlines. ⏰

Timely also offers powerful sorting and filtering options, allowing users to sort tasks alphabetically, by creation date, or by deadline. Additionally, tasks can be viewed in separate tabs based on their status (e.g., all tasks, completed tasks, incomplete tasks) and priority (e.g., tasks with deadlines, starred tasks).

Overall, Timely is more than just a task manager—it's a productivity companion that streamlines task management, enhances organization, and facilitates efficient completion of tasks, ultimately helping users achieve their goals effectively. 🚀

## Features
- ✅**User Authentication**: Secure signup and login protected by JWT authentication.
- ✅**Task Management**: Save, edit, delete, and fetch todos effortlessly.
- ✅**Status Tracking**: Mark todos as completed or incomplete to track progress.
- ✅**Starred Todos**: Star important todos for quick access and prioritization.
- ✅**Deadline Notifications**: Set deadlines for todos with email reminders sent 15 minutes before the deadline and upon crossing the deadline.
- ✅**Sorting Options**: Sort todos alphabetically, by creation date, or by deadline.
- ✅**Tabbed View**: View todos in separate tabs for all, completed, incomplete, deadline, and starred.

## Technologies Used
- MongoDB
- Express.js
- React.js
- Node.js
- JWT Authentication
- Material UI 
- Nodemailer
- Node Scheduler

### Starting Backend:

1. **Setup Environment Variables**:
   - Create a `.env` file with the following parameters:
     - `MONGO_URI`: URL for MongoDB
     - `JWT_SECRET`: Any string for JWT secret
     - `GOOGLE_ID`: Email-id from where reminder mail comes from.
     - `GOOGLE_PASS`: Password string for that id.
    - Here I have used :-
        ```
        MONGO_URI=mongodb://127.0.0.1:27017/notesapp
        JWT_SECRET=secretcode
        ```
2. **Navigate to Backend Directory**:
   - Open the main folder in the command prompt.
   - Type `cd backend` to navigate to the backend directory.

3. **Install Dependencies**:
   - Run `npm install` to install all required node_modules.

4. **Start the Server**:
   - Run `node ./server.mjs` to start the server-side application.

### Starting Frontend:

1. **Navigate to Frontend Directory**:
   - Open the main folder in the command prompt.
   - Type `cd frontend` to navigate to the frontend directory.

2. **Install Dependencies**:
   - Run `npm install` to install all required node_modules.

3. **Start the Client**:
   - Run `npm start` to start the client-side application.

4. **Access the Application**:
   - Visit `http://localhost:3000` in your web browser to access the application.
