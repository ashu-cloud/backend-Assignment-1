# 🚀 Full-Stack Task Management System

A production-ready, highly scalable RESTful API with Role-Based Access Control (RBAC), paired seamlessly with a blazing-fast, responsive **React (Vite)** frontend crafted using **Tailwind CSS**.

---

## ✨ Features

- **Robust Backend Architecture**: Built efficiently with Node.js and Express.js, featuring layered routing, controllers, and middleware separation.
- **Role-Based Access Control (RBAC)**: Supports `admin` and `user` roles. Admins manage the entire ecosystem naturally, while standard users exclusively map to their own personal tasks.
- **Advanced Security & Authentication**: Implements JSON Web Tokens (JWT) mapped to session persistence natively across the browser. Stores Bcrypt-hashed passwords safely in the MongoDB database.
- **Strict Payload Validation**: Utilizes `Zod` schemas to intercept malicious or malformed payloads *before* they hit the core controllers (Actively averts Mass Assignment Vulnerabilities and unauthorized data execution).
- **Responsive Dynamic UI**: A modern React Dashboard that intuitively shape-shifts between "Add" and "Edit" modes, dynamically auto-filling routing state and managing tokens implicitly across Axios requests.
- **RESTful Best Practices**: Clean URL patterns `/api/v1/...`, proper HTTP status codes (`201`, `400`, `401`, `403`, `404`, `500`), and standardized JSON error outputs encapsulating descriptive messages.

---

## 🛠️ Technology Stack

### Backend Context
- **Runtime Environment:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Validation Library:** Zod
- **Security Protocols:** JWT (jsonwebtoken), Bcrypt (password hashing), CORS

### Frontend Context
- **Framework:** React.js bootstrapped iteratively natively through **Vite**
- **Routing System:** React Router DOM (v6)
- **Styling Architecture:** Tailwind CSS v3
- **HTTP Client:** Axios (Configured uniquely with Auth Interceptors)
- **Iconography:** Lucide-React

---

## 📂 Project Structure

```text
📁 backend Assignment-1
├── 📁 backend
│   ├── 📁 src
│   │   ├── 📁 config        # Database connection logic
│   │   ├── 📁 controllers   # Auth & Task execution handlers
│   │   ├── 📁 middlewares   # JWT Validation & Zod Schema interceptors
│   │   ├── 📁 models        # Mongoose Data Schemas (User, Task)
│   │   ├── 📁 routes        # Definition of Express Router endpoints
│   │   ├── 📁 utils         # JWT Generation & Zod Validation Objects
│   │   ├── app.js           # Core Express Application
│   │   └── server.js        # Entry point configuring the port listener
│   ├── .env                 # Environment Variables
│   └── package.json         # Node Scripts & Dependencies
├── 📁 frontend
│   ├── 📁 src
│   │   ├── 📁 api           # Axios instance configuring the Interceptor
│   │   ├── 📁 context       # Global React State Context (AuthContext)
│   │   ├── 📁 pages         # Core application screens (Login, Register, Dashboard)
│   │   ├── App.jsx          # Primary Router configuration & Protected Routes
│   │   ├── index.css        # Core Tailwind directives
│   │   └── main.jsx         # React root renderer
│   ├── tailwind.config.js   # Tailwind UI extensions
│   ├── vite.config.js       # Vite Compiler configuration
│   └── package.json         # React Scripts & Dependencies
├── SCALABILITY_NOTE.md      # Strategic overview of enterprise microservice architecture
├── postman_collection.json  # Comprehensive API interactions mapped for QA testing
├── swagger.yaml             # Highly detailed OpenAPI 3.0 documentation
└── README.md                # System Documentation (You are here!)
```

---

## ⚙️ Installation & Setup

### 1. Prerequisites
- **Node.js** (`v18.0.0` or higher) installed locally on your system.
- **MongoDB** running locally on port `27017`, or an active MongoDB Atlas URI cluster.

### 2. Environment Variables
Inside the `/backend` directory, verify that your `.env` configuration accurately reflects these keys:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/task-assignment
JWT_SECRET=supersecretjwtkey_replace_in_production
```

### 3. Running the Backend Server
Open your bash terminal, navigate into the backend directory, and execute:
```bash
cd backend
npm install
npm run dev
```
*The Express Node server will actively output a success message indicating it is securely connected matching `http://127.0.0.1:5000`.*

### 4. Running the Frontend Dashboard
Open a secondary terminal process, navigate explicitly to the frontend directory, and execute the Vite compiler:
```bash
cd frontend
npm install
npm run dev
```
*You can now view the Graphical React Interface locally bypassing any CORS configuration restrictions at `http://localhost:3000`.*

---

## 🌐 API Documentation

Detailed Open API specifications mapping this server's complete route taxonomy are available at the root level within the `swagger.yaml` document. Alternatively, load the `postman_collection.json` file natively into **Postman** or **Insomnia** to automatically inherit correctly formatted REST routes comprising variables alongside HTTP response statuses!

*Core Endpoints mapped securely behind `/api/v1` encompass:*
- `POST /auth/register` (Public)
- `POST /auth/login` (Public)
- `GET /tasks` (Secured Bearer JWT)
- `POST /tasks` (Secured Bearer JWT)
- `PUT /tasks/:id` (Secured Bearer JWT)
- `DELETE /tasks/:id` (Secured Bearer JWT)

---

## 📈 Enterprise Scalability
Please rigorously evaluate the `SCALABILITY_NOTE.md` located implicitly in the root repository to understand the strategic operational blueprint outlining implementations maneuvering **Microservices arrays, localized Redis Caching layers, AWS Load Balancing, and Kubernetes Auto-Scaling pod orchestration paradigms.**
