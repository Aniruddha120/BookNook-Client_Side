"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import BookCard from "@/components/BookCard";
import Spinner from "@/components/Spinner";
import { API_URL } from "@/lib/api";
import type { Book } from "@/lib/types";

export default function AllBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "BookNook | All Books";
    fetch(`${API_URL}/books`)
      .then((res) => res.json())
      .then((data) => setBooks(Array.isArray(data) ? data : []))
      .catch(() => toast.error("Could not load books"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary">The whole shelf</p>
      <h1 className="mt-1 text-2xl font-bold sm:text-3xl">All Books</h1>
      <p className="mt-2 text-sm opacity-70">
        Every book in the library, newest first. Press View Details to borrow one.
      </p>

      {loading ? (
        <Spinner />
      ) : books.length === 0 ? (
        <p className="mt-12 text-center opacity-70">No books yet. Be the first to add one.</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </section>
  );
}
