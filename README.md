# BookNook

A small online library I built for the Programming Hero assignment. People can add books, borrow one for a week, and return it when they finish reading.

- Live site: https://book-nook-client-side-abxs.vercel.app
- API: https://booknook-server-72c9.onrender.com

## What you can do

- Browse everything. The home page has a Swiper banner, the six newest books, a short "how borrowing works" section and the categories that actually have books in them.
- Add a book with a cover image, title, author, category, description and how many copies you have. The image is uploaded to imgbb first, only the URL goes into the database.
- Open any book's details page and borrow it from the modal. The book then shows up in My Borrows with a return date seven days ahead.
- My Books lists only the books you added. From there you can edit one in place or delete it, and delete asks first inside a modal I wrote myself instead of using the browser's `confirm()`.
- Return a book from the My Borrows table. The copy count goes back up and the record disappears.
- Sign up with name, email, photo URL and password. The password needs an uppercase letter, a lowercase letter and six characters minimum. Google sign in works too.
- Private pages stay private. Add Book, My Books, My Borrows, My Profile and the details page all send you to login first, and after logging in you land back on the page you were trying to open.
- Loading spinners while data comes in, toast messages instead of `alert()`, page titles per route, and a 404 page that looks like the rest of the site.

## Built with

Next.js App Router with TypeScript, Tailwind CSS and DaisyUI, Swiper for the banner, BetterAuth with the MongoDB adapter and the JWT plugin for authentication, react-hot-toast for the messages.

TypeScript is used everywhere, including the API helpers in `lib/api.ts` and the shared `Book` and `Borrow` types.

## Running it locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Then fill in `.env.local`:

- `NEXT_PUBLIC_API_URL`: where the Express server runs, `http://localhost:5000` by default
- `BETTER_AUTH_URL`: this app's own URL, `http://localhost:3000`
- `BETTER_AUTH_SECRET`: any long random string
- `MONGO_URI` and `DB_NAME`: your MongoDB connection
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`: from Google Cloud Console
- `NEXT_PUBLIC_IMGBB_KEY`: an imgbb API key for the cover uploads

The Google OAuth client needs `http://localhost:3000/api/auth/callback/google` (or whichever port you run on) added as a redirect URI, otherwise Google login stops at the consent screen.

## The other half

Server code and API routes: https://github.com/Aniruddha120/BookNook-Server-Side
