"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("You have been logged out");
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/95 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-content">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M4 3a2 2 0 0 0-2 2v13.5a1 1 0 0 0 1.5.87L12 15.5l8.5 3.87A1 1 0 0 0 22 18.5V5a2 2 0 0 0-2-2H4Zm2 3h5v2H6V6Zm0 4h5v2H6v-2Z" />
            </svg>
          </span>
          <span className="font-serif text-xl font-bold tracking-tight">BookNook</span>
        </Link>

        <ul className="hidden items-center gap-6 text-sm font-medium md:flex">
          <li>
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
          </li>
          <li>
            <Link href="/books" className="hover:text-primary">
              All Books
            </Link>
          </li>
          {user && (
            <>
              <li>
                <Link href="/add-book" className="hover:text-primary">
                  Add Book
                </Link>
              </li>
              <li>
                <Link href="/my-books" className="hover:text-primary">
                  My Books
                </Link>
              </li>
              <li>
                <Link href="/my-borrows" className="hover:text-primary">
                  My Borrows
                </Link>
              </li>
            </>
          )}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  {user.image ? (
                    <img src={user.image} alt={user.name} />
                  ) : (
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-content">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
              <ul tabIndex={0} className="menu dropdown-content z-50 mt-3 w-56 rounded-box bg-base-100 p-2 shadow">
                <li className="menu-title truncate">{user.name}</li>
                <li>
                  <Link href="/my-profile">My Profile</Link>
                </li>
                <li>
                  <button type="button" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost btn-sm">
                Login
              </Link>
              <Link href="/register" className="btn btn-primary btn-sm">
                Register
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="btn btn-ghost btn-square md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {menuOpen && (
        <ul className="space-y-1 border-t border-base-300 px-4 py-3 text-sm font-medium md:hidden">
          <li>
            <Link href="/" className="block py-1" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/books" className="block py-1" onClick={() => setMenuOpen(false)}>
              All Books
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link href="/add-book" className="block py-1" onClick={() => setMenuOpen(false)}>
                  Add Book
                </Link>
              </li>
              <li>
                <Link href="/my-books" className="block py-1" onClick={() => setMenuOpen(false)}>
                  My Books
                </Link>
              </li>
              <li>
                <Link href="/my-borrows" className="block py-1" onClick={() => setMenuOpen(false)}>
                  My Borrows
                </Link>
              </li>
              <li>
                <Link href="/my-profile" className="block py-1" onClick={() => setMenuOpen(false)}>
                  My Profile
                </Link>
              </li>
              <li className="pt-2">
                <button type="button" className="btn btn-outline btn-sm w-full" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className="flex gap-2 pt-2">
              <Link href="/login" className="btn btn-ghost btn-sm flex-1" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link href="/register" className="btn btn-primary btn-sm flex-1" onClick={() => setMenuOpen(false)}>
                Register
              </Link>
            </li>
          )}
        </ul>
      )}
    </header>
  );
}
