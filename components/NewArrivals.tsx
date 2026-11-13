"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import BookCard from "@/components/BookCard";
import Spinner from "@/components/Spinner";
import { API_URL } from "@/lib/api";
import type { Book } from "@/lib/types";

export default function NewArrivals() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/books?limit=6`)
      .then((res) => res.json())
      .then((data) => setBooks(Array.isArray(data) ? data : []))
      .catch(() => toast.error("Could not load new arrivals"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-14">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Fresh on the shelf</p>
          <h2 className="mt-1 text-2xl font-bold sm:text-3xl">New Arrivals</h2>
        </div>
        <Link href="/books" className="btn btn-outline btn-sm">
          See All Books
        </Link>
      </div>

      {books.length === 0 ? (
        <p className="mt-10 text-center opacity-70">No books added yet.</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}

      <div className="mt-10 text-center sm:hidden">
        <Link href="/books" className="btn btn-primary">
          See All Books
        </Link>
      </div>
    </section>
  );
}
