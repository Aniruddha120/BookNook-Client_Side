import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-base-300 bg-base-200">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-content">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M4 3a2 2 0 0 0-2 2v13.5a1 1 0 0 0 1.5.87L12 15.5l8.5 3.87A1 1 0 0 0 22 18.5V5a2 2 0 0 0-2-2H4Zm2 3h5v2H6V6Zm0 4h5v2H6v-2Z" />
              </svg>
            </span>
            <span className="font-serif text-xl font-bold">BookNook</span>
          </Link>
          <p className="mt-4 text-sm">
            A small online library where readers add, borrow and return books.
          </p>
        </div>

        <div className="text-sm">
          <h3 className="mb-3 text-base font-semibold">Contact</h3>
          <p>hello@booknook.com</p>
          <p className="mt-1">+880 1700 000000</p>
          <p className="mt-1">Dhaka, Bangladesh</p>
        </div>

        <div className="text-sm">
          <h3 className="mb-3 text-base font-semibold">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <Link href="/books" className="hover:text-primary">
                All Books
              </Link>
            </li>
            <li>
              <Link href="/add-book" className="hover:text-primary">
                Add Book
              </Link>
            </li>
            <li>
              <Link href="/my-borrows" className="hover:text-primary">
                My Borrows
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-sm">
          <h3 className="mb-3 text-base font-semibold">Follow Us</h3>
          <div className="flex gap-2">
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="X"
              className="btn btn-circle btn-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M18.9 2H22l-7 8 8.2 12h-6.6l-5.1-7.3L5.6 22H2.5l7.4-8.5L2 2h6.7l4.8 6.9L18.9 2Zm-1.1 18h1.8L7.3 3.8H5.4L17.8 20Z" />
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="btn btn-circle btn-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.5 1.6-1.5h1.6V4.9c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4V11H7.6v3h2.7v8h3.2Z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="btn btn-circle btn-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.1.4.3 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.1-1 .3-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.1-.4-.3-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.1 1-.3 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.1 0-3.5 0-4.8.1-1 .1-1.5.2-1.8.3-.4.2-.7.4-1 .7-.3.3-.5.6-.7 1-.1.3-.2.8-.3 1.8-.1 1.3-.1 1.7-.1 4.8s0 3.5.1 4.8c.1 1 .2 1.5.3 1.8.2.4.4.7.7 1 .3.3.6.5 1 .7.3.1.8.2 1.8.3 1.3.1 1.7.1 4.8.1s3.5 0 4.8-.1c1-.1 1.5-.2 1.8-.3.4-.2.7-.4 1-.7.3-.3.5-.6.7-1 .1-.3.2-.8.3-1.8.1-1.3.1-1.7.1-4.8s0-3.5-.1-4.8c-.1-1-.2-1.5-.3-1.8-.2-.4-.4-.7-.7-1-.3-.3-.6-.5-1-.7-.3-.1-.8-.2-1.8-.3-1.3-.1-1.7-.1-4.8-.1Zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8Zm0 8.1a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Zm6.3-8.3a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0Z" />
              </svg>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="btn btn-circle btn-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-base-300 py-4 text-center text-xs">
        © 2026 BookNook. All rights reserved.
      </div>
    </footer>
  );
}
