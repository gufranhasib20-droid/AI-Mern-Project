# AI Interview Agent

An AI-powered mock interview platform that analyzes resumes, generates personalized interview questions, and delivers automated feedback with performance scoring — built to help candidates prepare for real interviews using AI.

---

## 🚀 Overview

**AI Interview Agent** is a full-stack MERN application that simulates a real interview experience using AI. Users upload their resume, get personalized questions generated based on their skills and experience, answer them, and receive instant AI-driven feedback along with a performance score — helping them identify strengths and areas to improve before a real interview.

---

---

## 📸 Screenshots

![Landing Page](../screenshots/Landing%20page.png)

![Interview Setup](../screenshots/Interview%20Setup.png)

![Resume Analysis](../screenshots/Resume%20analysis.png)

![Analytics Dashboard](../screenshots/Analytics%20dashboard.png)

![Pricing Plans](../screenshots/Pricing%20plans.png)

---

## ✨ Features

- 📄 **Resume Analysis** — Upload a PDF resume; the AI parses and analyzes it to understand the candidate's skills, experience, and background.
- 🤖 **Personalized Interview Questions** — Questions are dynamically generated using AI based on the candidate's resume and target role.
- 📝 **Automated Feedback** — AI evaluates each response and provides structured, actionable feedback.
- 📊 **Performance Scoring** — Candidates receive a score summarizing their overall interview performance.
- 🔐 **Authentication** — Firebase Google Authentication combined with JWT for secure session handling.
- 💳 **Credit-Based Monetization System** — A self-designed payment architecture (order creation, payment verification, and secure credit allocation) modeled after Razorpay's payment gateway flow, controlling access to AI-powered features.
- 🗂 **State Management** — Redux Toolkit manages application state across the client for a smooth, predictable UX.
- 📱 **Responsive UI** — Built with React.js and Tailwind CSS for a clean experience across devices.

---

## 🛠 Tech Stack

**Frontend:**
- React.js
- Redux Toolkit
- Tailwind CSS

**Backend:**
- Node.js
- Express.js
- MongoDB

**AI / Integrations:**
- OpenRouter (AI question generation & feedback engine)
- Firebase (Google Authentication)
- JWT (session/token-based authentication)

---

## 🔄 Application Workflow

1. **Sign Up / Login** — User authenticates via Firebase Google Authentication.
2. **Resume Upload** — User uploads a PDF resume, which is parsed and analyzed.
3. **Interview Setup** — AI generates a set of personalized interview questions based on the resume and role.
4. **Interview Session** — User answers the AI-generated questions within the app.
5. **AI Evaluation** — Responses are sent to the AI (via OpenRouter) for evaluation.
6. **Feedback & Scoring** — User receives detailed feedback and a performance score.
7. **Credits & Access** — AI-powered actions (like generating a new interview) consume credits. Credit purchases flow through a custom order-creation → payment-verification → credit-allocation pipeline, designed following a Razorpay-style payment gateway architecture.

---

## 📁 Project Structure

```
AI Mern Project/
├── client/                 # React frontend
│   ├── src/
│   ├── public/
│   ├── index.html
│   └── vite.config.js
└── server/                 # Node/Express backend
    ├── config/
    ├── controllers/
    │   ├── auth.controller.js
    │   ├── interview.controller.js
    │   ├── payment.controller.js
    │   └── user.controller.js
    ├── middlewares/
    ├── models/
    └── public/
```

---

## 🚧 Future Improvements

- Voice-based interview simulation (speech-to-text answers)
- Video interview mode with facial expression analysis
- Multi-language support
- Company-specific interview question banks
- Downloadable interview performance reports (PDF)

---

## 📌 Note

This project was built as a learning/portfolio project to demonstrate full-stack development with MERN and AI integration. The credit/monetization system is a custom-built implementation modeled on a Razorpay-style payment gateway flow (order creation, verification, credit allocation) rather than a live Razorpay integration.

---

## 📧 Contact

For questions or feedback, feel free to reach out via GitHub Issues or connect with me on LinkedIn.