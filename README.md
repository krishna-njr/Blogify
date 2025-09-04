# 📝 Blogify

Blogify is a simple blogging web application built using **Node.js**, **Express**, **MongoDB**, and **EJS** as the templating engine.  
It allows authenticated users to create, read, and comment on blogs. The project demonstrates full-stack development concepts with authentication, CRUD operations, and dynamic rendering using server-side templates.

---

## 🚀 Features
- 🔐 **User Authentication** (Register/Login system)
- ✍️ **Create Blogs** – Authenticated users can publish blogs.
- 💬 **Comment System** – Users can comment on blogs.
- 📄 **Dynamic Rendering** with EJS templates.
- 🗄️ **MongoDB Integration** for persistent storage.
- ⚡ **Express Server** to handle routes and API endpoints.

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js  
- **Frontend:** EJS (Embedded JavaScript Templates), CSS  
- **Database:** MongoDB (Mongoose ODM)  
- **Authentication:** Express-session / Passport.js (depending on implementation)

---

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/blogify.git
   cd blogify
   ```
2. **Install dependencies**
     ```npm install```

3. **Set up environment variables**
  Create a .env file in the root directory and add:
```
PORT=3000
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
```

4. **Run the development server**
  ```
npm run dev
```

6. **Open in browser**
```
http://localhost:3000
```



