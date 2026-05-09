# 🚀 PrimeFlow CRM

PrimeFlow CRM is a full-stack lead management web application designed for small sales teams to manage customer leads, track sales progress, update lead statuses, and improve workflow efficiency using a centralized dashboard system.

---
# 📌 What is PrimeFlow CRM?

PrimeFlow CRM is a modern Customer Relationship Management (CRM) system that helps sales teams to:

* Manage customer leads efficiently
* Track sales pipeline progress
* Store and organize activity notes
* Monitor sales performance using dashboards
* Improve communication and workflow

The system focuses on real-world CRM workflows, clean architecture, and scalable full-stack desig

---

# 🎯 Objective of the Project

 * Manage customer leads
 * Track lead statuses
 * Monitor sales performance
 * Store activity notes
 * Improve workflow efficiency
 * Visualize business analytics using charts & KPI metrics

---
# ⚙️ Tech Stack

* Frontend: React + Vite , TailwindCSS
* Backend: Node.js + Express
* 8Database: PostgreSQL (NeonDB)
* 8Authentication: JWT
* Deployment: Back-end: Railway, Front-end: vercel

---

#  📥 Setup Instructions (Step-by-Step)

Follow these steps to run the project on your local machine.

### 1️⃣ Install Prerequisites

* **Node.js**
* **npm**
* **Git (optional)**

Check installation:

```
node -v
npm -v
```

---

### 2️⃣ Clone the Repository

```
git clone https://github.com/SanthushEk/PrimeFlow-CRM-Project.git
```

### 3️⃣ Navigate to Project Folder

```
cd primeFlow-CRM-Project
```

---

### 4️⃣ Redrect to Front-End Folder & Install Dependencies

```
cd front-end
npm install

```

---

### 5️⃣ Redrect to Back-End Folder & Install Dependencies

```
cd back-end
npm install

```

---

### 6️⃣ Back_End Folder add .env file and Past

```

DATABASE_URL='Use Neon db url Here'
JWT_SECRET=mysecretkey
PORT=5000

```
```

npm run dev

```

---

### 7. Front_End Folder add .env file and Past

```

VITE_API_URL="Use backend deplyment url here I use Railway for backend server running"

```
```

npm run dev

```

---

#  📥 Setup Instructions (Step-by-Step)

🔐 Test Login Credentials

* Email: admin@example.com
* Password: password123

 ---

 # 🗄️ Database Setup Instructions

#### 🗄️ 1. Create Database (Optional in Neon)

```

CREATE DATABASE "PrimeFlow";

```

---

#### 📋 2. Leads Table

```

CREATE TABLE public.leads (
    id SERIAL PRIMARY KEY,
    name TEXT,
    company TEXT,
    email TEXT,
    phone TEXT,
    source TEXT,
    assigned TEXT,
    status TEXT,
    value NUMERIC,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```

---

#### 📊 3. Notes Table

```

CREATE TABLE public.notes (
    id SERIAL PRIMARY KEY,
    lead_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_by VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_lead
        FOREIGN KEY (lead_id)
        REFERENCES public.leads (id)
        ON DELETE CASCADE
);

```

---

#### 📊 3. Notes Table

```

CREATE TABLE public.notes (
    id SERIAL PRIMARY KEY,
    lead_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_by VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_lead
        FOREIGN KEY (lead_id)
        REFERENCES public.leads (id)
        ON DELETE CASCADE
);

```

---

  ---

  #📊 Features
  
* 🔐 JWT Authentication (Login/Register)
* 📋 Lead Management (CRUD operations)
* 📈 Sales Analytics Dashboard
* 📝 Activity Notes System
* 🔍 Lead Filtering by Status
* ☁️ PostgreSQL Cloud Integration
* ⚡ REST API Backend
* 🎨 Responsive UI Design

  ---

    #⚠️ Limitations
  
Your CRM is mainly designed for small to medium-scale use, so it may face performance issues with large datasets due to lack of pagination and optimization. It has a basic authentication system without advanced role-based access control. Security is limited, with no rate limiting or strong input validation. The system also lacks real-time updates, advanced analytics, and automation features like lead scoring or notifications. Additionally, it uses a simple monolithic backend structure, has no file storage support, and may not be fully optimized for production deployment.

  ---
#🧠 Short Reflection

* This project was developed as part of an internship assessment
* It improved my full-stack development skills using React, Node.js, and PostgreSQL
* I learned how to build authentication systems using JWT
* I gained experience in designing real-world CRM workflows
* I also improved deployment skills using Railway,Vercel and cloud databases

  ---
  Demo: https://drive.google.com/file/d/1SP2uqAVqlnPVAzCCg6_4RWXWvjdg4L0F/view?usp=sharing
  ---

  #👨‍💻 Author

* Name: Santhush Ekanayake
* Role: Intern Software Engineer
* Stack: React | Node.js | PostgreSQL
  

