# BookNook – A Small Online Library

BookNook is a small online library where readers add books, borrow them for a week, and return them when they are done. The client is a Next.js App Router application that talks to an Express + MongoDB API.

Live site: https://booknook-client.vercel.app

## Features

- Browse every book in the library as a card grid, with a details page for each title.
- Add a book with a cover image uploaded to imgbb, a category, a description and a total copy count.
- Borrow a book from its details page and return it later from the My Borrows table.
- Edit or delete the books you added, with a confirmation modal before deleting.
- Email/password login and registration with password rules, plus Google login, all handled by BetterAuth.
- Private routes stay private: Add Book, My Books, My Borrows, My Profile and book details ask for a login first.
- Loading spinners on every data page, toast messages for success and error, and a custom 404 page.

## Tech

Next.js (App Router), Tailwind CSS, DaisyUI, Swiper, BetterAuth with the MongoDB adapter and JWT plugin, react-hot-toast.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Environment variables:

- `NEXT_PUBLIC_API_URL` – Express server URL
- `BETTER_AUTH_URL` – this app's URL
- `BETTER_AUTH_SECRET` – secret used to sign sessions
- `MONGO_URI` – MongoDB connection string
- `DB_NAME` – database name
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` – Google OAuth credentials
- `NEXT_PUBLIC_IMGBB_KEY` – imgbb API key for cover uploads

Server side: https://github.com/Aniruddha120/BookNook-Server-Side
