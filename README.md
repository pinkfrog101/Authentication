#  Authentication API

A secure **Node.js + Express authentication system** implementing modern best practices such as **JWT-based stateless access tokens**, **HTTP-only refresh tokens**, and protected routes.

This project is designed to demonstrate real-world authentication flows commonly used in production-grade applications.

---

##  Features

* -> User Registration
* -> User Login
* -> Stateless JWT Access Token
* -> Refresh Token stored in **HTTP-only cookies**
* -> Token Refresh Endpoint
* -> Secure Logout
* -> Protected Route (GET)
* -> Password Hashing using **bcrypt**
* -> Middleware-based Token Authentication

---

##  Authentication Flow Overview

1. **Register**

   * User signs up with email & password
   * Password is hashed and stored securely

2. **Login**

   * Credentials are validated
   * Server issues:

     * **Access Token** (short-lived, stateless)
     * **Refresh Token** (long-lived, stored in HTTP-only cookie)

3. **Access Protected Routes**

   * Client sends Access Token in `Authorization` header
   * Server verifies token without storing session data

4. **Refresh Token**

   * When Access Token expires, client calls refresh endpoint
   * Server validates Refresh Token from cookie
   * Issues a new Access Token

5. **Logout**

   * Refresh Token is cleared from cookies
   * User is logged out securely

---

##  Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB + Mongoose**
* **JWT (jsonwebtoken)**
* **bcrypt**
* **cookie-parser**
* **dotenv**

---

##  Project Structure

```
backend/
│── controllers/
│   └── authController.js
│── middleware/
│   └── verifyJWT.js
│── models/
│   └── User.js
│── routes/
│   └── authRoutes.js
|__ app.js
│── server.js
│── .env
│── .gitignore
```

---

##  API Endpoints

###  Register User

**POST** `/register`

```json
{
  "username": "john",
  "email": "john@example.com",
  "password": "password123"
}
```

---

###  Login User

**POST** `/login`

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

* Access Token (JSON)
* Refresh Token (HTTP-only cookie)

---

###  Refresh Access Token

**GET** `/refresh`

* Reads Refresh Token from HTTP-only cookie
* Returns a new Access Token

---

###  Logout User

**POST** `/logout`

* Clears Refresh Token cookie
* Invalidates session

---

###  Protected Route

**GET** `/protected`

**Headers:**

```
Authorization: Bearer <access_token>
```

Returns protected user data if token is valid.

---

##  Security Practices Used

* Passwords hashed with **bcrypt**
* Refresh tokens stored in **HTTP-only cookies** (XSS-safe)
* Access tokens kept **stateless** (no DB storage)
* Short-lived access tokens
* Token verification via middleware

---

##  Environment Variables

Create a `.env` file in the root directory:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
```

---

##  Getting Started

```bash
npm install
npm run dev
```

Server will run on:

```
http://localhost:5000
```

---

##  Use Cases

* Learning Authentication & Authorization
* Backend Portfolio Project
* Foundation for MERN / Next.js apps
* Interview-ready JWT implementation


---

###  If you find this project useful, consider giving it a star on GitHub!
