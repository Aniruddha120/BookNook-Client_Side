"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { API_URL, authFetch } from "@/lib/api";
import type { Book } from "@/lib/types";
import Spinner from "@/components/Spinner";

export default function BookDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [borrowing, setBorrowing] = useState(false);

  useEffect(() => {
    document.title = "BookNook | Book Details";
    fetch(`${API_URL}/books/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          toast.error(data.message);
        } else {
          setBook(data);
        }
      })
      .catch(() => toast.error("Could not load the book"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleBorrow = async () => {
    if (!book) {
      return;
    }

    setBorrowing(true);
    const res = await authFetch("/borrows", {
      method: "POST",
      body: JSON.stringify({ bookId: id }),
    });
    const data = await res.json();
    setBorrowing(false);

    if (!res.ok) {
      toast.error(data.message || "Could not borrow the book");
      return;
    }

    toast.success("Book borrowed. Enjoy reading!");
    setBook({ ...book, copies: book.copies - 1 });
    setModalOpen(false);
  };

  if (loading) {
    return <Spinner />;
  }

  if (!book) {
    return (
      <section className="mx-auto w-full max-w-3xl px-4 py-16 text-center">
        <p className="text-lg">This book is no longer on the shelf.</p>
        <Link href="/books" className="btn btn-primary mt-6">
          Back to All Books
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12">
      <Link href="/books" className="link link-hover text-sm opacity-70">
        ← Back to All Books
      </Link>

      <div className="mt-6 grid gap-8 md:grid-cols-[320px_1fr]">
        <img
          src={book.image}
          alt={book.title}
          className="h-80 w-full rounded-box object-cover shadow-sm md:h-full"
        />

        <div>
          <span className="badge badge-secondary">{book.category}</span>
          <h1 className="mt-3 text-2xl font-bold sm:text-3xl">{book.title}</h1>
          <p className="mt-1 text-sm opacity-70">by {book.author}</p>

          <p className="mt-5 text-sm leading-relaxed">{book.description}</p>

          <div className="mt-6 space-y-1 text-sm opacity-80">
            <p>
              Added by <span className="font-semibold">{book.userName}</span> ({book.userEmail})
            </p>
            <p>
              {book.copies > 0
                ? `${book.copies} of ${book.totalCopies} copies available`
                : "Not Available"}
            </p>
          </div>

          <button
            type="button"
            className="btn btn-primary mt-8"
            disabled={book.copies < 1}
            onClick={() => setModalOpen(true)}
          >
            {book.copies < 1 ? "Not Available" : "Borrow This Book"}
          </button>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="card w-full max-w-md bg-base-100 shadow-xl">
            <div className="card-body gap-4">
              <div>
                <h2 className="text-xl font-bold">Borrow this book</h2>
                <p className="text-sm opacity-70">{book.title}</p>
              </div>

              <label className="floating-label">
                <span>Your Name</span>
                <input type="text" value={user?.name || ""} readOnly className="input input-bordered w-full" />
              </label>

              <label className="floating-label">
                <span>Your Email</span>
                <input type="email" value={user?.email || ""} readOnly className="input input-bordered w-full" />
              </label>

              <p className="text-xs opacity-70">
                Borrowed books are due back in 7 days. You can return it from My Borrows.
              </p>

              <div className="card-actions justify-end">
                <button type="button" className="btn btn-ghost" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={handleBorrow} disabled={borrowing}>
                  {borrowing ? "Borrowing..." : "Confirm Borrow"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
