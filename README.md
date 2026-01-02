# 🧠 Quiz Master - Professional Quiz Management Platform

Quiz Master is a modern, high-performance **Quiz Application** built with a focus on seamless user experience and robust administrative control. Leveraging the power of **React**, **TypeScript**, and **Framer Motion**, it offers a premium feel with fluid animations and real-time data handling.

---

## 🚀 Key Features

* **Interactive Quiz Engine:** Engaging UI for taking quizzes with real-time timers and smooth state transitions.
* **Comprehensive Admin Dashboard:** Manage categories, questions, and user data with ease.
* **Advanced Profile Management:** Support for profile/cover image uploads and international phone number validation.
* **Seamless Marquee:** A customized, flicker-free promotional marquee for trust badges and announcements.
* **Dynamic Data Handling:** Real-time search, filtering, and pagination for large datasets using React Query.
* **Responsive Design:** Fully optimized for all screen sizes—from mobile devices to large desktop monitors.

---

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | React 18 (Vite) |
| **Language** | TypeScript |
| **State Management** | Redux Toolkit & React Query (TanStack) |
| **Styling** | Tailwind CSS |
| **Animations** | Framer Motion |
| **Icons** | React Icons (Lucide, Md, Io) |
| **Form Handling** | React Phone Input 2 & Native Validations |

---

## 📁 Project Structure

```text
src/
├── app/            # Redux store and global state configuration
├── assets/         # Static assets (images, fonts, global styles)
├── components/     # Reusable UI components (Modals, Popups, Tables)
├── hooks/          # Custom hooks and React Query mutations/queries
├── layouts/        # Page wrappers (Sidebar, Navigation, Footer)
├── pages/          # Main application views (Dashboard, Quiz, Profile)
├── services/       # Axios configuration and API interceptors
└── utils/          # Helper functions, validation schemas, and constants
⚙️ Getting Started
1. Clone the Repository
Bash

git clone [https://github.com/your-username/quiz-app-frontend.git](https://github.com/your-username/quiz-app-frontend.git)
cd quiz-app-frontend
2. Install Dependencies
Bash

npm install
3. Environment Variables
Create a .env file in the root directory and add your backend API endpoint:

Code snippet

VITE_BASE_URL=[http://your-api-url.com](http://your-api-url.com)
4. Run Development Server
Bash

npm run dev
🎨 Component Highlights
Smooth Animations
Every popup and page transition is powered by Framer Motion, ensuring a non-clunky, modern feel that increases user retention.

File Upload Integration
Integrated with Multer on the backend to allow users to upload and preview profile pictures and cover photos in real-time.

Efficient Data Fetching
Utilizes React Query for caching and background updates, significantly reducing loading times and improving performance.

