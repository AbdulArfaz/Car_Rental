# 🚗 Firefly: Advanced Full-Stack Car Rental Platform

> An enterprise-grade, feature-rich car rental web application evolved from a college MCA project (originally built in PHP Laravel) and rebuilt using the *MERN stack*, featuring cloud image management, secure authentication, Axios API integration, and advanced booking controls.

---

## 🌐 Live Link

*   *Live Application:* [View Live Application](https://car-rental-chi-livid.vercel.app)
---

## ✨ Core Features & Capabilities

*   🔍 *Advanced Fleet Discovery:* Dynamic search and filtering system allowing users to search cars instantly by *brand* or *model*.
*   🔐 *Secure Authentication System:* User registration with password hashing (bcrypt), login, and protected routes using HTTP-only cookies, cookie-parser, and dual *JWT (Access & Refresh Tokens)*.
*   🚘 *Fleet & Availability Management:* Authenticated owners/users can add new cars, upload vehicle images via *Multer* and *ImageKit, and instantly **toggle car availability* on or off.
*   📅 *Comprehensive Booking Dashboard:* Users and owners can seamlessly book vehicles, view active/past reservations, and manage their own bookings.
*   ⚡ *Modern UI/UX:* Smooth micro-animations using *Framer Motion, robust API communication via **Axios, rigorous request validation, and instant feedback loops via **Sonner* toast notifications.

---

## 🛠️ Tech Stack & Deployment

*   *Frontend:* React.js, Tailwind CSS, *Axios, Framer Motion, Sonner *(Deployed on **Vercel)
*   *Backend & API:* Node.js, Express.js, JWT, Bcrypt, Multer, Validator (Deployed on **Render)
*   *Database & Storage:* *MongoDB & Mongoose* (NoSQL Database), *ImageKit SDK* (Cloud Media Hosting)

---

## 📁 Folder Structure

```text
Car_Rental_Management_System/
│
├── client/
│   ├── public/
│   ├── src/
│   ├── .env
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── db/
│   ├── middleware/
│   ├── models/
│   ├── public/
│   ├── routes/
│   ├── utils/
│   ├── .env
│   ├── app.js
│   ├── constants.js
│   ├── server.js
│   └── package.json
│
├── .gitignore
├── .prettierignore
├── .prettierrc
├── package.json
├── package-lock.json
└── README.md