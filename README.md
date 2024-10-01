Netflix Clone Backend

This project is a backend-only Netflix clone built using Node.js and MongoDB. The API fetches movie and TV show data from TMDB (The Movie Database), and it includes features such as user authentication, movie browsing, and saving favorites. This project focuses on server-side development.

## Features
- User Authentication (Sign up, Login)
- Password Hashing (bcryptjs)
- JWT-based Authentication
- Movie data using TMDB API
- MongoDB as the database
- Nodemon for development
- Cookies for session management

## Dependencies

### Main Dependencies:
- **express**: Web framework for Node.js
- **mongoose**: ODM for MongoDB
- **bcryptjs**: Library to hash passwords
- **jsonwebtoken**: Library for token-based authentication (JWT)
- **axios**: HTTP client for making requests to the TMDB API
- **cookie-parser**: Middleware to handle cookies
- **dotenv**: Environment variable management

### Dev Dependencies:
- **nodemon**: Tool for automatically restarting the server during development

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js installed (v12 or higher).
- **MongoDB**: Set up a MongoDB instance locally or via a service like MongoDB Atlas.
- **TMDB API Key**: You will need an API key from [TMDB](https://www.themoviedb.org/).

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/RonakPatel2468/Netflix_Clone_Backend.git
    cd netflix-clone-backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory with the following content:
    ```bash
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/netflixClone
    JWT_SECRET=your_jwt_secret
    TMDB_API_KEY=your_tmdb_api_key
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

    This will start the server using `nodemon` for automatic restarts during development.