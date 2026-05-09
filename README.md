🚀 PrimeFlow CRM












📌 Overview

PrimeFlow CRM is a full-stack lead management system designed for small sales teams to efficiently manage customer leads, track sales progress, and visualize performance through a centralized dashboard.

It provides a modern workflow for handling leads, notes, and sales analytics in a clean and responsive UI.

🎯 Key Features
🔐 JWT Authentication (Login/Register)
📋 Lead Management (Create, Read, Update, Delete)
📝 Activity Notes Tracking
📊 Sales Analytics Dashboard
🔍 Lead Status Filtering
⚡ Real-time API Integration
☁️ PostgreSQL Cloud Database (NeonDB)
🎨 Responsive UI with React + Vite
🧰 Tech Stack
Frontend	Backend	Database	Auth
React + Vite	Node.js + Express	PostgreSQL (NeonDB)	JWT
📸 Screenshots
🔐 Login Page

📊 Dashboard

📋 Leads Management

📝 Notes Section

⚙️ Setup Instructions
1️⃣ Clone Repository
git clone https://github.com/SanthushEk/PrimeFlow-CRM-Project.git
2️⃣ Move into Project
cd primeFlow-CRM-Project
3️⃣ Install Frontend Dependencies
cd front-end
npm install
4️⃣ Install Backend Dependencies
cd ../back-end
npm install
5️⃣ Backend Environment Setup

Create .env file inside back-end:

DATABASE_URL=postgresql://neondb_owner:npg_p6hyHxBdel4u@ep-fancy-shape-ao4btc0c-pooler.c-2.ap-southeast-1.aws.neon.tech/PrimeFlow?sslmode=require&channel_binding=require
JWT_SECRET=mysecretkey
PORT=5000
▶️ Run Backend
npm run dev
6️⃣ Frontend Environment Setup

Create .env file inside front-end:

VITE_API_URL=https://amused-consideration-production-762d.up.railway.app
▶️ Run Frontend
npm run dev
🔐 Test Login Credentials
Email: test@example.com
Password: 123456
🗄️ Database Information
PostgreSQL (NeonDB Cloud)
Auto schema integration via backend
No manual DB setup required
🎥 Demo Video

👉 https://your-demo-link-here.com

📈 Project Highlights
Real-world CRM workflow implementation
Full-stack integration (React + Node.js)
Cloud database integration (NeonDB)
Production-ready REST API structure
Clean UI/UX design
Internship-level professional project
🧠 Reflection

This project helped me strengthen full-stack development skills including React frontend architecture, Node.js API development, JWT authentication, PostgreSQL integration, and deployment workflows. It also improved my understanding of real-world CRM systems and scalable application structure.

👨‍💻 Author

Santhush Ekanayake
Full-Stack Developer | Intern Software Engineer
React | Node.js | PostgreSQL | AWS
