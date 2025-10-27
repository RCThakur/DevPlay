# 🎮 DevPlay — The Developer Action Game

DevPlay is a **MERN Stack** based action-adventure web game that combines _learning, coding, and gameplay_. Players embark on a developer’s journey — solving coding challenges, fighting bugs, and upgrading their skills as they progress.

This project demonstrates **modern full-stack development** using:

- ⚛️ React (Vite) for the front end
- 🧠 Node.js + Express for the backend
- 🗄️ MongoDB for data persistence
- 🔐 JWT Authentication for secure login/signup
- 📦 REST APIs with Axios integration

---

## 🚀 Project Structure

---bash
| Folder / File | Description |
|----------------|-------------|
| **client/** | Frontend (React + Vite) |
| ┣ 📂 **public/** | Static assets and index.html |
| ┣ 📂 **src/** | Source code for frontend |
| ┃ ┣ 📂 **components/** | Reusable UI components (e.g., Navbar, GameCanvas) |
| ┃ ┣ 📂 **pages/** | Application pages (Login, Signup, Home, Game, etc.) |
| ┃ ┣ 📂 **context/** | AuthContext for global user authentication state |
| ┃ ┣ 📂 **services/** | Axios API configuration and HTTP helpers |
| ┃ ┣ 📜 **App.jsx** | Main React component and route definitions |
| ┃ ┗ 📜 **main.jsx** | React app entry point (renders App) |
| ┣ 📜 **package.json** | Client dependencies and scripts |
| ┗ 📜 **vite.config.js** | Vite configuration file |
| **server/** | Backend (Express + MongoDB) |
| ┣ 📂 **config/** | MongoDB connection setup |
| ┣ 📂 **controllers/** | Logic for authentication and gameplay APIs |
| ┣ 📂 **models/** | Mongoose models (User, Game, etc.) |
| ┣ 📂 **routes/** | Express routes for API endpoints |
| ┣ 📜 **server.js** | Backend entry point (Express app) |
| ┗ 📜 **package.json** | Backend dependencies and scripts |
| **README.md** | Project documentation (this file) |

---

---

## 🧩 Features Implemented (So Far)

✅ **Frontend (Vite + React)**

- Login and Signup pages with AuthContext
- Navigation using React Router
- Axios integrated API communication
- Modern folder structure for scalability

✅ **Backend (Express + MongoDB)**

- User model with password hashing (bcrypt)
- JWT-based authentication (login + register routes)
- MongoDB connection with environment variables
- REST API tested and ready for integration

✅ **Other Configurations**

- Separate client and server folders for clean architecture
- Concurrent development setup ready (via `npm run dev` and server on port 5000)

---

## ⚙️ Tech Stack

| Layer         | Technology                                     |
| ------------- | ---------------------------------------------- |
| **Frontend**  | React (Vite), React Router, Context API, Axios |
| **Backend**   | Node.js, Express.js, JWT, bcrypt               |
| **Database**  | MongoDB (Mongoose ORM)                         |
| **Dev Tools** | npm, Vite, Git, VS Code                        |

---

## 🧠 Getting Started

# Start Backend

cd server
npm start

# Start Frontend

cd ../client
npm run dev

---

### 1️⃣ Clone Repository

```bash
git clone https://github.com/RCThakur/DevPlay.git
cd DevPlay
```
