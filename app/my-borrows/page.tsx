"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { authFetch } from "@/lib/api";
import type { Borrow } from "@/lib/types";
import Spinner from "@/components/Spinner";

export default function MyBorrowsPage() {
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState("");

  useEffect(() => {
    document.title = "BookNook | My Borrows";
    authFetch("/borrows")
      .then((res) => res.json())
      .then((data) => setBorrows(Array.isArray(data) ? data : []))
      .catch(() => toast.error("Could not load your borrows"))
      .finally(() => setLoading(false));
  }, []);

  const handleReturn = async (borrow: Borrow) => {
    setReturningId(borrow._id);
    const res = await authFetch(`/borrows/${borrow._id}`, { method: "DELETE" });
    const data = await res.json();
    setReturningId("");

    if (!res.ok) {
      toast.error(data.message || "Could not return the book");
      return;
    }

    toast.success("Book returned. Thanks for bringing it back!");
    setBorrows(borrows.filter((item) => item._id !== borrow._id));
  };

  const formatDate = (value: string) => new Date(value).toLocaleDateString();

  if (loading) {
    return <Spinner />;
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary">Your reading list</p>
      <h1 className="mt-1 text-2xl font-bold sm:text-3xl">My Borrows</h1>
      <p className="mt-2 text-sm opacity-70">Return a book when you are done so others can read it.</p>

      {borrows.length === 0 ? (
        <div className="mt-12 text-center">
          <p className="opacity-70">You have not borrowed any books yet.</p>
          <Link href="/books" className="btn btn-primary mt-6">
            Browse Books
          </Link>
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-box border border-base-300">
          <table className="table">
            <thead>
              <tr>
                <th>Book</th>
                <th>Borrow Date</th>
                <th>Return Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {borrows.map((borrow) => (
                <tr key={borrow._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <img
                        src={borrow.bookImage}
                        alt={borrow.bookTitle}
                        className="h-14 w-10 rounded object-cover"
                      />
                      <span className="font-semibold">{borrow.bookTitle}</span>
                    </div>
                  </td>
                  <td>{formatDate(borrow.borrowDate)}</td>
                  <td>{formatDate(borrow.returnDate)}</td>
                  <td className="text-right">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      disabled={returningId === borrow._id}
                      onClick={() => handleReturn(borrow)}
                    >
                      {returningId === borrow._id ? "Returning..." : "Return Book"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
