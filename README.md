<div align="center">
  <img src="src/assets/logo.png" alt="MedCamp Pro Logo" width="120" />
  <h1>🩺 MedCamp Pro</h1>
  <p><b>Complete Modern Web Application</b></p>
  <p>
    <img src="https://img.shields.io/badge/React-18.0-blue?logo=react" />
    <img src="https://img.shields.io/badge/Vite-4.0-purple?logo=vite" />
    <img src="https://img.shields.io/badge/Node.js-18.x-green?logo=node.js" />
    <img src="https://img.shields.io/badge/Express-5.x-black?logo=express" />
    <img src="https://img.shields.io/badge/MongoDB-6.x-brightgreen?logo=mongodb" />
  </p>
  <p>
    <b>Fullstack Project: Frontend & Backend Included</b>
  </p>
  <p>
    <i>Empowering communities through accessible healthcare camps.</i>
  </p>
</div>

---

## 🌐 Live Site

[https://medicamp-pro.web.app](https://medicamp-pro.web.app)

---

## 👤 Organizer Credentials

- **email:** admin@gmail.com
- **Password:** Admin11!

---

## 🚀 Features

- Organizer & Participant dashboards with private routes
- Responsive design for mobile, tablet, desktop, and dashboard
- Popular camps section with live participant counts
- Camp details with registration modal and participant info
- Feedback & Ratings system for each camp
- Secure Stripe payment integration
- JWT authentication (localStorage) for protected routes
- TanStack Query for all GET data fetching
- Sweet alerts/toasts for all CRUD/auth actions (no browser alerts)
- 404 Not Found page
- Footer with essential links and contact info
- Environment variables for Firebase & MongoDB credentials
- No Lorem Ipsum anywhere

---

## 📝 Notable Commits

### Client Side (20+)
- Initial project setup and Tailwind config
- Responsive Navbar with profile dropdown and outside click close
- Home page banner slider with success stories
- Popular camps section with dynamic participant count
- Camp details modal and registration form
- Feedback & Ratings section implementation
- Available Camps page with search, sort, and layout toggle
- Organizer dashboard: profile, add camp, manage camps, manage registrations
- Participant dashboard: analytics (Recharts), profile, registered camps, payment history
- Stripe payment integration and payment status update
- JWT auth setup with axios interceptor
- TanStack Query for all GET requests
- Sweet alerts/toasts for all CRUD/auth actions
- 404 Page and Footer component
- Pagination and search for all tables
- Environment variable usage for sensitive keys
- Social login (Firebase) on Join Us/Register
- Modal and form validation with react-hook-form
- Mobile/tablet/desktop responsive fixes
- README and screenshots added

### Server Side (12+)
- Express server and MongoDB connection
- JWT authentication and middleware
- Organizer and participant role management
- Camp CRUD endpoints (add, update, delete, get)
- Registration and participant count update
- Payment and payment history endpoints
- Feedback & Ratings endpoints
- Pagination and search endpoints for tables
- Secure environment variable usage
- Error handling and 404 route
- CORS and security middleware
- Deployment scripts and config

---

## 📦 Tech Stack

- **Frontend:** React, Tailwind CSS, Recharts, Stripe.js, Headless UI, TanStack Query, Sonner Toasts
- **Backend:** Node.js, Express, MongoDB, JWT
- **Auth:** Firebase Authentication
- **Other:** React Router, react-hook-form

---

## 🛠️ Getting Started

1. **Clone the repo:**
   ```bash
   git clone https://github.com/yourusername/medicamp-pro.git
   ```

2. **Install dependencies:**
   ```bash
   cd medicamp-pro/medicamp-cliant
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in both `client` and `server` folders.
   - Add your API URLs, Firebase keys, Stripe keys, MongoDB URI, etc.

4. **Run the app:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**  
   [http://localhost:5173](http://localhost:5173)

---

## 📁 Project Structure

```text
src/
├── Components/        # Reusable UI components
├── Context/           # React context providers
├── Firebase/          # Firebase config
├── Layout/            # App layouts
├── Pages/             # Application pages
├── Private/           # Private route logic
├── Routes/            # App routing
├── Shared/            # Shared UI elements
├── Utils/             # Utility functions & hooks
```

---

## ✨ Screenshots

|Home | Dashboard | Analytics |
|-----------|-----------|--------------|
| ![Home](https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-shakilsarkar12/blob/main/screenshort/Home.png?raw=true) | ![Dashboard](https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-shakilsarkar12/blob/main/screenshort/dashboard.png) | ![Analytics](https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-shakilsarkar12/blob/main/screenshort/analytics.png) |

---

## 📋 Website Highlights

- Modern, mobile-first UI with Tailwind CSS
- Organizer and participant dashboards with analytics
- Camp registration with live participant count
- Feedback and ratings system for transparency
- Secure authentication and protected routes
- Sweet alerts/toasts for all user actions
- Pagination and search in all tables
- Stripe payment integration
- 404 Not Found page and helpful footer
- All sensitive keys hidden with environment variables

---

## 🤝 Contributing

Pull requests are welcome!  
For major changes, please open an issue first to discuss what you’d like to change.

---

## Get Server Side Repo

[Server side](https://github.com/shakilsarkar12/medcamp-pro-server)
---

## 📧 Contact

Questions or suggestions?  
Feel free to reach out:

- **Name:** Md Shakil Sarkar  
- **Email:** [shakil.sarkar1932@gmail.com](mailto:shakil.sarkar1932@gmail.com)

---

---

**MedCamp Pro** – Empowering communities through accessible healthcare.  
Let's make a difference, one camp at a time! 🚑
