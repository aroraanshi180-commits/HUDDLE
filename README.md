# Huddle

A real-time team task management app built with the MERN stack. Designed for small teams and project groups to plan, sync, and stay accountable — without switching between apps.

> **Status:** Actively in development. Core features are built; real-time collaboration, AI-assisted prioritization, and analytics are in progress.

---

## ✨ Features

### ✅ Built
- User authentication (signup/login)
- Forgot password flow with email-based reset link
- Task creation and editing
- Priority levels
- Due date assignment

### 🚧 In Progress
- Multi-user team workspaces with role-based permissions (Admin/Member)
- Real-time task sync across team members (Socket.io)
- In-app + email notifications for due dates and task updates
- AI-assisted task prioritization
- Team analytics dashboard (individual + admin views)
- Live deployment

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Real-time | Socket.io *(in progress)* |
| Email | Nodemailer |
| AI Integration | LLM API *(in progress)* |
| API Testing | Postman |

---

## 📦 Getting Started

### Prerequisites
- Node.js installed
- MongoDB (local instance or MongoDB Atlas)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/huddle.git
cd huddle

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Environment Variables

Create a `.env` file in the `backend` folder with the following:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email_for_nodemailer
EMAIL_PASS=your_email_app_password
```

> Never commit your `.env` file — it's already excluded via `.gitignore`.

### Running Locally

```bash
# Start backend (from /backend)
npm start

# Start frontend (from /frontend, in a separate terminal)
npm start
```

---

## 📂 Project Structure

```
huddle/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
└── README.md
```

*(Update this to match your actual folder structure once finalized.)*

---

## 🗺️ Roadmap

- [x] Authentication & password recovery
- [x] Core task CRUD with priority and due dates
- [ ] Team workspaces with role-based access
- [ ] Real-time sync via Socket.io
- [ ] In-app + email notifications
- [ ] AI-assisted task prioritization
- [ ] Analytics dashboard
- [ ] Live deployment
- [ ] Real-time team chat (stretch)

---

## 📸 Screenshots

*(Add screenshots here once UI is polished — recruiters and visitors often look at this section first.)*

---

## 📄 License

This project is for educational and portfolio purposes.

---

## 👤 Author

Built by Anshi — B.Tech CS & AI student, Shoolini University.
