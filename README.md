# 🔗 URL Shortener

A full-stack URL Shortener application that allows users to create, manage, and protect short links.
Users can generate short URLs, edit them, delete them, and optionally secure them with a password.

---

## 🚀 Features

* Create short URLs
* Redirect to original URL
* Edit existing short links
* Delete links
* Password protected links
* Secure password hashing
* Clean and responsive UI

---

## 🛠 Tech Stack

### Frontend

* React
* Tailwind CSS
* Daisy UI
* React Router

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Other Tools

* Argon2 (password hashing)
* Axios (API requests)

---

## 📂 Project Structure

```
project-root
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── lib
│   │   └── App.jsx
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   └── server.js
│
└── README.md
```

---

## ⚙️ Installation

### 1 Clone the repository

```
git clone https://github.com/RiteishClg/mern-url-shortener.git
```

### 2 Go to the project folder

```
cd url-shortener
```

### 3 Install dependencies

Frontend

```
cd client
npm install
```

Backend

```
cd server
npm install
```

---

## ▶️ Run the Project

### Start Backend

```
cd server
npm run dev
```

### Start Frontend

```
cd client
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside the server folder.

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

---

## 📡 API Endpoints

### Create Short URL

```
POST /api/shorturl
```

### Get All URLs

```
GET /api/shorturl
```

### Get Single URL

```
GET /api/shorturl/:id
```

### Update URL

```
PUT /api/shorturl/:id
```

### Delete URL

```
DELETE /api/shorturl/:id
```

---

## 🔐 Password Protection

If a link is protected, the user must enter the correct password before accessing the original URL.

Passwords are securely hashed using **Argon2** before storing them in the database.

---

## 👨‍💻 Author

Riteish Verma

---