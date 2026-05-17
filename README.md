# AI Notes Workspace

A full-stack AI-powered collaborative notes workspace built for the Peblo Full Stack Developer Challenge.

The application allows users to create, manage, organize, summarize, and share notes with productivity-focused analytics and AI-powered workflows.

---

# 🚀 Live Demo

## Frontend

https://ai-notes-app-kiyx.vercel.app/

## Backend

https://ai-notes-backend-l1mw.onrender.com

---

# 💻 GitHub Repository

PASTE_YOUR_GITHUB_REPO_LINK

---

# ✨ Features

## 🔐 Authentication

* User Signup & Login
* JWT-based Authentication
* Protected Routes
* Persistent Sessions
* Secure Password Hashing using bcrypt

---

## 📝 Notes Workspace

* Create Notes
* Edit Notes
* Delete Notes
* Autosave Notes
* Archive Notes
* Organize Notes using Tags
* Recently Edited Notes

---

## 🤖 AI Integration

Integrated Groq LLM (Llama 3.1) for:

* AI-generated Summaries
* Action Item Extraction
* Suggested Titles

---

## 🔍 Search & Filtering

* Keyword Search
* Filter Notes by Tags
* Sort by Recently Updated Notes

---

## 🌐 Public Sharing

* Generate Public Share Links
* Access Shared Notes without Login
* Public/Private Visibility Handling

---

## 📊 Productivity Dashboard

* Total Notes
* Recently Edited Notes
* Most Used Tags
* AI Usage Statistics
* Weekly Activity Summary

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Tailwind CSS
* Axios

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

## AI

* Groq API (Llama 3.1)

## Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

# 📂 Project Structure

```bash
peblo-assignment
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   └── server.js
```

---

# ⚙️ Local Setup Instructions

## 1️⃣ Clone Repository

```bash
git clone YOUR_GITHUB_REPO_LINK
```

---

# 2️⃣ Backend Setup

```bash
cd server
npm install
```

## Create `.env`

```env
MONGO_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET

GROQ_API_KEY=YOUR_GROQ_API_KEY
```

## Run Backend

```bash
npm start
```

Backend runs on:

```bash
http://localhost:5000
```

---

# 3️⃣ Frontend Setup

```bash
cd client
npm install
```

## Run Frontend

```bash
npm start
```

Frontend runs on:

```bash
http://localhost:3000
```

---

# 🔗 API Endpoints

## Authentication

```http
POST /auth/signup
POST /auth/login
```

## Notes

```http
GET /notes
POST /notes
PATCH /notes/:id
DELETE /notes/:id
```

## AI

```http
POST /notes/:id/ai
```

## Sharing

```http
POST /notes/:id/share
GET /notes/shared/:id
```

## Dashboard

```http
GET /notes/dashboard/stats
```

---

# 🧠 AI Workflow

The application integrates Groq’s Llama 3.1 model to process note content and generate:

* concise summaries
* action items
* suggested titles

This improves productivity and creates a more intelligent note-taking experience.

---

# 📸 Sample Outputs

## AI Summary Example

```json
{
  "summary": "Weekly sprint planning discussion...",
  "action_items": [
    "Prepare API documentation",
    "Review frontend layout"
  ],
  "suggested_title": "Sprint Planning Notes"
}
```

---

# 📈 Product Thinking

The application was designed with a productivity-first approach inspired by modern SaaS tools like:

* Notion
* Evernote
* Google Docs

Special focus was given to:

* autosave UX
* responsive interactions
* dashboard analytics
* AI-assisted workflows

---

# 🚀 Future Improvements

* Dark Mode
* Rich Text Editor
* Export PDF
* AI Chat with Notes
* Real-time Collaboration
* Markdown Support
* Keyboard Shortcuts

---

# 👩‍💻 Author

Harshada Sonje

Built as part of the Peblo Full Stack Developer Challenge.
