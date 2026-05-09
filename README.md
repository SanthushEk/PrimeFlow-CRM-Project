PrimeFlow CRM

PrimeFlow CRM is a full-stack lead management web application developed for small sales teams to manage customer leads, track sales progress, update lead statuses, and improve workflow efficiency through a centralized dashboard system.

📌 What is PrimeFlow CRM?

PrimeFlow CRM is a modern CRM (Customer Relationship Management) system designed to help sales teams:

Manage customer leads efficiently
Track sales pipeline progress
Store and organize activity notes
Monitor sales performance through dashboards
Improve workflow and communication
🎯 Objective of the Project
Manage customer leads
Track lead statuses
Monitor sales performance
Store activity notes
Improve workflow efficiency
Visualize business analytics through charts and KPI metrics
⚙️ Tech Stack
Frontend: React + Vite
Backend: Node.js / Express
Database: PostgreSQL (NeonDB)
Authentication: JWT
Deployment: Railway
📥 Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/SanthushEk/PrimeFlow-CRM-Project.git
2️⃣ Move into Project Directory
cd primeFlow-CRM-Project
3️⃣ Install Frontend Dependencies
cd front-end
npm install
4️⃣ Install Backend Dependencies
cd ../back-end
npm install
5️⃣ Backend Environment Setup

Inside the back-end folder, create a .env file and add:

DATABASE_URL=postgresql://neondb_owner:npg_p6hyHxBdel4u@ep-fancy-shape-ao4btc0c-pooler.c-2.ap-southeast-1.aws.neon.tech/PrimeFlow?sslmode=require&channel_binding=require
JWT_SECRET=mysecretkey
PORT=5000
▶️ Start Backend Server
npm run dev
6️⃣ Frontend Environment Setup

Inside the front-end folder, create a .env file and add:

VITE_API_URL=https://amused-consideration-production-762d.up.railway.app
▶️ Start Frontend
npm run dev
🔐 Test Login Credentials
Email: test@example.com
Password: 123456

(Update this if your backend uses different seed users)

🗄️ Database Setup Instructions
Database: PostgreSQL (NeonDB)
No manual setup required (cloud database already configured)
Ensure .env contains correct DATABASE_URL
Run backend → tables will be created automatically (if using migrations/ORM)
📊 Features
🔐 JWT Authentication (Login/Register)
📋 Lead Management System (CRUD)
📈 Sales Analytics Dashboard
📝 Activity Notes Tracking
🔍 Lead Status Filtering
☁️ PostgreSQL Cloud Database Integration
⚡ REST API Backend
🎨 Modern Responsive UI
🧠 Short Reflection

This project was developed as part of an internship assessment to demonstrate full-stack development skills. It helped strengthen my understanding of React frontend architecture, Node.js backend API development, authentication using JWT, and PostgreSQL database integration. I also gained experience in building real-world CRM workflows, debugging full-stack systems, and deploying applications using cloud services like Railway and NeonDB.

🎥 Demo Video

👉 Watch Demo Video

👨‍💻 Author

Santhush Ekanayake
Intern Software Engineer
Full-Stack Developer (React | Node.js | PostgreSQL)
