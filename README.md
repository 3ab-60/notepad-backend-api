🗒️ Notepad Backend API

A backend REST API built using FastAPI that implements JWT-based authentication.
This project focuses on user registration, secure login, and token generation using modern backend best practices.

🔧 Tech Stack

* Framework: FastAPI
* Language: Python
* Authentication: JWT (OAuth2 Password Flow)
* Database: SQLite
* ORM: SQLAlchemy
* Password Hashing: Passlib (bcrypt)

📂 Project Structure

notepad-backend-api/
│
├── app/
│   ├── main.py            # Application entry point
│   ├── auth.py            # JWT & password logic
│   ├── database.py        # Database connection
│   ├── models.py          # User model
│   ├── schemas.py         # Request/response schemas
│   └── routes/
│       └── auth_routes.py # Authentication routes
│
├── requirements.txt
├── .gitignore
└── README.md

▶️ How to Run the Project

1️⃣ Install dependencies

```bash
pip install -r requirements.txt
```

2️⃣ Start the FastAPI server

```bash
python -m uvicorn app.main:app --reload
```

3️⃣ Open API Documentation

Visit:

```
http://127.0.0.1:8000/docs
```

This opens FastAPI’s Swagger UI.

✅ How to Verify Authentication is Working

Follow the steps below to confirm authentication works correctly.

🟢 Step 1: Register a User

Endpoint

```
POST /auth/register
```

Request Body

```json
{
  "email": "testuser@example.com",
  "password": "testpassword"
}
```

Expected Response

```json
{
  "message": "User registered successfully"
}
```

✔ Confirms database connectivity and password hashing.


🟢 Step 2: Login and Receive JWT Token

Endpoint

```
POST /auth/login
```

Request Body

```json
{
  "email": "testuser@example.com",
  "password": "testpassword"
}
```

Expected Response

```json
{
  "access_token": "<JWT_TOKEN>",
  "token_type": "bearer"
}
```

✔ Confirms credential validation and JWT token generation.


🔐 Security Measures Implemented

* Passwords are hashed using bcrypt
* JWT tokens include expiration
* Credentials are never stored in plain text

🧠 What This Project Demonstrates

* Backend authentication workflow
* Secure password handling
* JWT token generation
* FastAPI + SQLAlchemy integration
* Clean project structure and Git practices

👩‍💻 Author

Roschelle Mary James
AI Trainee Engineer|Developer

Focus Areas
* Chatbots
* Backend Development
* Databases

📌 Notes

This project is intentionally focused on authentication only and serves as a foundation.
It can be extended with:

* Protected routes
* Notes CRUD APIs
* Role-based access
* Frontend integration

