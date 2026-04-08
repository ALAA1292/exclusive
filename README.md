

# Exclusive E-Commerce Store

A modern **E-Commerce web application** built with **Next.js, TypeScript, and Tailwind CSS**.
The application provides a full online shopping experience including **authentication, product browsing, cart management, wishlist, and checkout**.

The project demonstrates modern **Next.js App Router architecture**, secure authentication with **NextAuth**, and responsive UI design.

---

# Features

### Authentication

* Secure user login and registration
* Session management using NextAuth
* Protected user pages

### Shopping Experience

* Browse products
* View product details
* Filter by categories
* Browse brands

### Cart System

* Add products to cart
* Update quantities
* Remove items from cart

### Wishlist

* Save favorite products
* Manage wishlist items

### Checkout

* Complete checkout flow
* Order creation
* Order history page

### User Profile

* View user information
* Manage account

### UI/UX

* Fully responsive design
* Modern UI using Tailwind CSS
* Loading states
* Error handling pages

---

# Tech Stack

Frontend

* Next.js (App Router)
* TypeScript
* Tailwind CSS

Authentication

* NextAuth.js

State & Data Handling

* React Hooks
* API Routes

Utilities

* Axios
* React Icons
* Toast notifications

---

# Project Structure

```bash
src
 ├── app
 │    ├── (auth)
 │    │     ├── login
 │    │     └── register
 │    │
 │    ├── (shop)
 │    │     ├── products
 │    │     ├── categories
 │    │     └── brands
 │    │
 │    ├── cart
 │    ├── checkout
 │    ├── wishlist
 │    ├── profile
 │    └── allorders
 │
 ├── api
 │    └── auth
 │         └── [...nextauth]
 │
 ├── assets
 └── Providers.tsx
```

---

# Getting Started

Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
```

Enter the project directory

```bash
cd your-repo-name
```

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

Open in browser

```
http://localhost:3000
```

---



# Live Demo

You can view the deployed project here

```
exclusive-alaaabdo-7qhltncyh-alaa-abdos-projects.vercel.app
```

---

# Future Improvements

* Payment integration (Stripe)
* Product search
* Product reviews
* Admin dashboard
* Product ratings
* Dark mode

---


