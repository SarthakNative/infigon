# Product Explorer 🛒

🔗 **Live Demo:** https://infigon-eight.vercel.app/

A production-style frontend application built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**, showcasing modern component architecture, performance best practices, and user-focused features.

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18 or later)
- npm or yarn

### Steps
```bash
# Clone the repository
git clone <your-repo-url>

# Navigate into the project
cd product-explorer

# Install dependencies
npm install
# or
yarn install

# Run the development server
npm run dev
# or
yarn dev
```

Open your browser and visit:  
👉 http://localhost:3000

---

## ✨ Features Implemented

### ✅ Core Features

#### 1. Product Listing Page
- Fetches products from:
  - https://fakestoreapi.com/products
- Displays products in a **responsive grid**
  - Image
  - Title
  - Price
  - Category
- Includes:
  - Loading state (skeleton loaders)
  - Error state with graceful fallback UI

#### 2. Search & Filtering
- Client-side search by **product title**
- Category-based filtering via dropdown
- Instant updates without page reload

#### 3. Product Details Page
- Dynamic routing using:
  - `/products/[id]`
- Displays:
  - Large product image
  - Title
  - Description
  - Price
  - Category
- Implemented using **Next.js App Router dynamic routes**

#### 4. Favorites Feature
- Users can:
  - Mark / unmark products as favorites
- Favorites are:
  - Persisted using `localStorage`
- Includes:
  - Toggle to view only favorite products

#### 5. Responsive Design
- Mobile-first approach
- Fully usable on:
  - Mobile
  - Tablet
  - Desktop

---

## 🌟 Bonus Features Implemented

- **Server Components** where appropriate for performance and SEO
- **Pagination** for better data handling and UX
- **Sorting by price**
  - Low → High
  - High → Low
- **Dark Mode Toggle**
  - Persisted theme using system/local preference
- **Basic Accessibility**
  - ARIA labels
  - Keyboard navigable controls
- **Unit Tests**
  - Implemented using Jest & Testing Library

---

## ⚖️ Assumptions & Trade-offs

- **Client-side search & filtering**
  - Assumed product dataset size is manageable
  - Keeps implementation simple and fast

- **localStorage for favorites**
  - No backend or authentication assumed
  - Data is device/browser-specific

- **Fake Store API**
  - Used as-is without caching or backend proxy
  - Assumed high availability for demo purposes

- **Pagination**
  - Implemented client-side instead of server-side
  - Suitable for demo-scale datasets

- **Accessibility**
  - Focused on essential ARIA roles and keyboard navigation
  - Not a full WCAG audit, but strong baseline

---

## 🧠 Tech Stack

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Jest & Testing Library**
- **Vercel** for deployment

---

## 📌 Notes

This project was built with a **real-world, production mindset**, emphasizing:
- Clean component architecture
- Readable and maintainable code
- Performance and user experience
- Accessibility and responsiveness

---

👤 **Author:** Sarthak Tiwari  
