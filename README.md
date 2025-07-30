

# Simple Blog Web App with Authentication

Welcome to the Simple Blog Web App! This project is a full-stack application featuring user authentication, built with a modern tech stack. Below, you'll find details on setup, usage, and development.

## 1. Introduction
This documentation outlines the steps to develop a simple blog post web application with user authentication. The backend is powered by FastAPI (Python), the frontend uses Next.js/React.js, and MongoDB serves as the database. Sample data is fetched from [JSONPlaceholder](https://jsonplaceholder.typicode.com) for blog posts.

## 2. Tech Stack
- **Backend**: FastAPI
- **Frontend**: Next.js / React.js
- **Database**: MongoDB
- **External API**: JSONPlaceholder

## 3. Backend (FastAPI)
### Authentication
- JWT-based authentication for signup, login, and logout.

### Routes
- `POST /signup`: Register a new user.
- `POST /login`: Authenticate user and return JWT.
- `GET /posts`: Fetch all posts (authentication required).
- `POST /posts`: Create a new blog post (authentication required).

### Models
- `User`: Username, Email, Password (hashed).
- `Post`: Title, Body, Author (reference to User).

### Dependencies
- `fastapi`
- `motor` (async MongoDB driver)
- `passlib`
- `python-jose`

## 4. Frontend (Next.js / React.js)
### Pages
- `/login`: User login page.
- `/signup`: User registration page.
- `/posts`: Display all blog posts.
- `/create`: Create a new blog post.

### Features
- Token storage in `localStorage`.
- Protected routes.
- Axios for HTTP requests.

## 5. MongoDB Configuration
- Use MongoDB Atlas or a local MongoDB instance.
- **Collections**:
  - `users`: Stores user information.
  - `posts`: Stores blog post content.

## 6. External API (JSONPlaceholder)
- Fetches sample posts from `https://jsonplaceholder.typicode.com/posts`.
- Intended for development purposes only; replace with real user-generated content later.

## 7. Running the Application
### Backend
1. Install dependencies: `pip install -r requirements.txt`.
2. Run the server: `uvicorn main:app --reload`.

### Frontend
1. Install dependencies: `npm install`.
2. Run the dev server: `npm run dev`.

## 8. Security Tips
- Always hash passwords before storing.
- Use HTTPS in production.
- Store JWT secret securely.
- Set appropriate CORS headers.

## 9. Contributing
Feel free to submit issues or pull requests. Let's make this app even better!

## 10. License
This project is open-source under the MIT License.

