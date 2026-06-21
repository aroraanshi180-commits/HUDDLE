# CRM Task Manager

MERN stack monorepo: React (Vite) frontend + Express/MongoDB backend.

## Folder structure

```
crm-task-manager/
├── client/                 # React frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   └── services/       # API calls (axios)
│   ├── package.json
│   └── node_modules/       # Frontend dependencies only
│
├── server/                 # Express backend
│   ├── config/             # DB connection
│   ├── controllers/        # Route handlers
│   ├── middleware/         # Auth, error handling
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   ├── .env                # Server secrets (not committed)
│   ├── package.json
│   └── node_modules/       # Backend dependencies only
│
├── package.json            # Root scripts (run both apps)
├── node_modules/           # Root dev tools only (concurrently)
└── README.md
```

## Why are there multiple `node_modules` folders?

This is **normal and intentional** for a MERN monorepo:

| Location | Purpose |
|----------|---------|
| `/node_modules` | Root dev tools only (`concurrently` to run client + server together) |
| `/client/node_modules` | React, Vite, Tailwind, axios, etc. |
| `/server/node_modules` | Express, Mongoose, bcrypt, JWT, etc. |

Each app has its **own** `package.json` and installs only what it needs. The frontend should not ship server packages, and vice versa. This keeps installs faster and bundles smaller.

## Setup

1. **MongoDB** — create/use database `mern_demo` (or update `MONGO_URI` in `server/.env`).

2. **Install dependencies:**
   ```bash
   npm run install:all
   npm install
   ```

3. **Environment** — copy `server/.env.example` to `server/.env` and set `JWT_SECRET`.

4. **Run dev (client + server):**
   ```bash
   npm run dev
   ```

   - API: http://localhost:5000  
   - Client: http://localhost:5173  

## API

### Health
```
GET /api/health
```

### Auth
```
POST /api/auth/register   { "name", "email", "password" }
POST /api/auth/login      { "email", "password" }
```

Login returns a JWT `token` — send it as `Authorization: Bearer <token>` on protected routes.

### Tasks
```
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start client + server |
| `npm run dev:server` | Server only |
| `npm run dev:client` | Client only |
| `npm run build` | Build client for production |
| `npm start` | Start server (production) |
