Netflix Clone Backend

This project is a backend-only Netflix clone built using Node.js and MongoDB. The API fetches movie and TV show data from TMDB (The Movie Database), and it includes features such as user authentication, movie browsing, and saving favorites. This project focuses on server-side development.

Table of Contents

Features
Technologies Used
Installation
Environment Variables
API Endpoints

Features

User authentication (sign up, login) with JWT tokens.
Password encryption using bcrypt.
Fetching popular movies, trending shows, and genres from TMDB API.
MongoDB for user data storage.

Technologies Used

Node.js: JavaScript runtime environment.
Express.js: Web framework for building the backend.
MongoDB: NoSQL database for storing user information.
Mongoose: Object Data Modeling (ODM) library for MongoDB.
Axios: For making API requests to TMDB.
bcrypt.js: For hashing and validating passwords.
jsonwebtoken: For handling user authentication and secure sessions.
dotenv: To manage environment variables.
cookie-parser: To handle cookies for session management.

Environment Variables

You need to create a .env file in the root directory of your project. Below is a list of required environment variables:
PORT=9000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_for_jwt
TMDB_API_KEY=your_tmdb_api_key