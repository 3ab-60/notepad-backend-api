📝 Notepad Web Application (Full Stack)

A full-stack Notepad system built with FastAPI Backend + React Frontend, featuring JWT authentication, CRUD notes management, AI note assistant (LLM-powered) and History tracking.

This project allows users to Register → Login → Create Notes → Edit → Delete → View History, and even chat with AI for help writing notes.

🚀 Tech Stack

Backend (Python – FastAPI)

| Feature        | Library                       |
| -------------- | ----------------------------- |
| API Framework  | FastAPI                       |
| Database ORM   | SQLAlchemy                    |
| Auth           | JWT Tokens                    |
| AI Integration | Hugging Face API(Meta Llama)  |
| CORS Handling  | FastAPI Middleware            |

Frontend (React)

| Feature       | Library         |
| ------------- | --------------- |
| UI Framework  | React + MUI     |
| HTTP Calls    | Axios           |
| Notifications | React Hot Toast |
| Routing       | React Router    |
| Token Storage | LocalStorage    |

📁 Project Structure

notepad-backend/
│── app/
│   ├── main.py               # FastAPI entry
│   ├── database.py           # DB connection
│   ├── models.py             # SQLAlchemy Models (User & Notes)
│   ├── schemas.py            # Pydantic Schemas
│   ├── auth.py               # Login/Register + Token Generation
│   └── routes/
│       ├── auth_routes.py    # /register /login APIs
│       ├── notes_routes.py   # CRUD notes APIs
│       └── ai_routes.py      # AI Assistant API
│
│── notepad.db                # SQLite database (Ignored from Git)
│── .env                      # HF Keys + Secret Key (Ignored)
│── requirements.txt
│
└── notepad-ui/               # Frontend
    ├── src/
    │   ├── pages/            # Login, Register, Notes, AIChat, Calendar, History
    │   ├── components/       # Navbar, ProtectedRoute (optional)
    │   ├── api.js            # Base API config
    │   ├── theme.js          # Custom MUI Theme
    │   └── App.js            # Route Handling
    └── package.json

🔐 Environment Variables (`.env`)

⚠️ Your `.env` is not included in repo.
Anyone running must create `.env` manually.

`.env` contents:

```
HF_API_KEY=your_key
HF_MODEL=meta-llama/Meta-Llama-3-8B-Instruct:novita
SECRET_KEY=your_secret_key
```

I kept DB URL & API URLs inside code, so others can run without changing them.
Only keys must be replaced.

🛠 Installation & Running Project

1️⃣ Clone Repo

```bash
git clone https://github.com/3ab-60/notepad-backend-api.git
cd notepad-backend-api
```

2️⃣ Backend Setup

Create virtual env

```bash
python -m venv venv
venv\Scripts\activate    # Windows
```

Install packages

```bash
pip install -r requirements.txt
```

Create `.env` file in root

```
HF_API_KEY=your_key
HF_MODEL=meta-llama/Meta-Llama-3-8B-Instruct:novita
SECRET_KEY=your_secret
```

Run backend server

```bash
uvicorn app.main:app --reload
```

📌 Backend runs on → **[http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)**

---

3️⃣ Frontend Setup

```bash
cd notepad-ui
npm install
npm start
```

📌 Frontend runs on → **[http://localhost:3000](http://localhost:3000)**

---

🧠 Project Flow

User → Register → Login (Token generated) → Redirect to Notes Page

Notes Page:
- Add new note (Title + Content + Date + completed/pending checkbox)
- Edit / Delete existing notes
- Search notes
- View history
- Access AI Assistant

AI Assistant:
- Sends text to HF model
- Returns summarized or generated content
- Helps enhance notes writing


📌 Notes for Evaluators / Users

| Item        | Status                           |
| ----------- | -------------------------------- |
| Secret keys | Must be added manually to `.env` |
| URLs        | Hard-coded, no change required   |
| DB          | SQLite auto created on run       |
| First run   | Fresh DB (no users/data)         |

🏁 Conclusion

This Notepad Web Application provides a complete end-to-end solution for note management with authentication, CRUD operations, history tracking, and integrated AI assistance. 
The setup is simple and development-friendly.

🔧 Customization Note

Although API base URLs are currently hard-coded for easy execution, developers can modify and configure their own backend URL or database source anytime based on deployment needs.



