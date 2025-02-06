# tinkteq-auth-rbac

A backend application built with **Express**, **Mongoose** (MongoDB), and **JWT** for authentication and authorization. This project includes user authentication, role-based access control, and JWT token-based authorization.

## Features

- **User Authentication**: Allows users to log in and receive an access token and a refresh token.
- **Role-Based Access Control (RBAC)**: Users can have different roles (`admin`, `shipper`, `carrier`) with specific permissions.
- **JWT Tokens**: Secure JWT tokens are used for authentication, including both access and refresh tokens.
- **Logout**: Users can log out, which will clear the refresh token.
- **Password Hashing**: User passwords are hashed and stored securely in the database.

## Tech Stack

- **Node.js** with **Express** for building the backend API.
- **MongoDB** with **Mongoose** for database interactions.
- **JWT** (JSON Web Token) for secure user authentication.
- **Bcryptjs** for hashing user passwords.

## Installation

Follow these steps to set up the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/Elijah57/tinkteq-auth-rbac.git
cd tinkteq-auth-rba
```

### 2. Install dependencies

Run the following command to install the necessary dependencies:

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root of the project and add the following environment variables:

```
MONGO_URI=mongodb://localhost:27017/yourdatabase or cloud instance
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRY=1h
JWT_REFRESH_SECRET=your_refresh_jwt_secret_key
JWT_REFRESH_EXPIRY=7d
PORT=5000
```

### 4. Start the server

To start the application, use the following command:

```bash
npm run dev
```

The app should now be running at `http://localhost:5000`.

## API Endpoints

### 1. **POST /login**

- **Description**: Authenticates the user and returns an access token and refresh token.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "status": true,
    "accessToken": "access-token",
  }
  cookies: 
    refreshToken
    httpOnly: True
    secure: True
  ```

### 2. **POST /logout**

- **Description**: Logs the user out by clearing the refresh token.
- **Response**:
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

### 3. **POST /register**

- **Description**: Registers a new user with a given email, password, and role.
- **Request Body**:
  ```json
  {
    "firstname": "John",
    "lastname": "Doe",
    "phone": "+234123456",
    "email": "user@example.com",
    "password": "password123",
    "role": "admin"
  }
  ```
- **Response**:
  ```json
  {
    "status": true,
    "message": "User created successfully"
  }
  ```

### 4. **GET /users**

- **Description**: Retrieves a list of all users (accessible only by an admin).
- **Authorization**: Requires a valid access token.
- **Response**:
  ```json
  [
    {
      "_id": "user-id",
      "firstname": "John",
      "lastname": "Doe",
      "email": "user@example.com",
      "role": "admin"
    },
    ...
  ]
  ```

### 5. **GET /user/:id**

- **Description**: Retrieves a specific user's details by their `id` (accessible by the user themselves or an admin).
- **Authorization**: Requires a valid access token.
- **Response**:
  ```json
  {
    "_id": "user-id",
    "firstname": "John",
    "lastname": "Doe",
    "phone": "+234123456",
    "email": "user@example.com",
    "role": "admin"
  }
  ```

### 6. **Middleware**

- **isAdmin**: Ensures the user is an admin before proceeding with the next middleware or route.
- **isCarrier**: Ensures the user is a carrier before proceeding with the next middleware or route.
- **isShipper**: Ensures the user is a shipper before proceeding with the next middleware or route.
- **hasRole**: Ensures the user has one of the allowed roles (e.g., `admin`, `shipper`, `carrier`) before proceeding.

## Authentication & Authorization

- The application uses **JWT (JSON Web Tokens)** for authentication.
- **Access tokens** are used for short-term authentication, typically valid for 1 hour (`JWT_EXPIRY`).
- **Refresh tokens** are used to obtain new access tokens after the old ones expire. These tokens are stored in **HTTP-only cookies** to prevent client-side access and are valid for 7 days (`JWT_REFRESH_EXPIRY`).
- **Role-based Access Control (RBAC)** is implemented to restrict access based on the user's role (`admin`, `shipper`, `carrier`).

### Middleware

- **`isAdmin`**: This middleware ensures that only users with the `admin` role can access specific routes. 
- **`hasRole`**: This middleware allows you to check if the current user has one of the allowed roles (for example, `admin` or `shipper`).

## Error Handling

The project uses custom error classes (`BadRequest`, `Forbidden`, `ResourceNotFound`) to handle common HTTP errors. These are automatically handled and returned as JSON responses with appropriate status codes.

- **400 Bad Request**: For invalid data or request formatting.
- **403 Forbidden**: For access denied, such as insufficient role permissions.
- **404 Not Found**: For requests where the resource is not found (e.g., user not found).
- **500 Internal Server Error**: For unhandled errors.

## Testing

You can test the endpoints using a tool like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/).

1. **Login** to get the `accessToken` and `refreshToken`.
2. Use the `accessToken` in the **Authorization** header for routes that require authentication.

## Contributing

If you would like to contribute to this project, feel free to fork the repository, make your changes, and submit a pull request. Please follow the general guidelines for code quality and provide clear commit messages.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
