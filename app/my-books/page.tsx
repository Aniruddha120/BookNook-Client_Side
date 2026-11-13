"use client";

import { useCallback, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { API_URL, authFetch } from "@/lib/api";
import type { Book } from "@/lib/types";
import Spinner from "@/components/Spinner";

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

export default function MyBooksPage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Book | null>(null);
  const [deleting, setDeleting] = useState<Book | null>(null);
  const [saving, setSaving] = useState(false);

  const loadBooks = useCallback(async () => {
    const res = await fetch(`${API_URL}/books`);
    const data = await res.json();
    setBooks(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => {
    document.title = "BookNook | My Books";
  }, []);

  useEffect(() => {
    loadBooks().catch(() => toast.error("Could not load your books"));
  }, [loadBooks]);

  const myBooks = books.filter((book) => book.userEmail === user?.email);

  const handleEditChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setEditing({ ...editing, [event.target.name]: event.target.value } as Book);
  };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!editing) {
      return;
    }

    setSaving(true);

    const res = await authFetch(`/books/${editing._id}`, {
      method: "PATCH",
      body: JSON.stringify({
        title: editing.title,
        author: editing.author,
        category: editing.category,
        image: editing.image,
        description: editing.description,
        totalCopies: editing.totalCopies,
      }),
    });
    const data = await res.json();
    setSaving(false);

    if (!res.ok) {
      toast.error(data.message || "Could not update the book");
      return;
    }

    toast.success("Book updated");
    setEditing(null);
    loadBooks();
  };

  const handleDelete = async () => {
    if (!deleting) {
      return;
    }

    const res = await authFetch(`/books/${deleting._id}`, { method: "DELETE" });
    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message || "Could not delete the book");
      return;
    }

    toast.success("Book deleted");
    setBooks(books.filter((book) => book._id !== deleting._id));
    setDeleting(null);
  };

  if (isPending || loading) {
    return <Spinner />;
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary">Books you added</p>
      <h1 className="mt-1 text-2xl font-bold sm:text-3xl">My Books</h1>
      <p className="mt-2 text-sm opacity-70">Edit the details or remove a book from the library.</p>

      {myBooks.length === 0 ? (
        <div className="mt-12 text-center">
          <p className="opacity-70">You have not added any books yet.</p>
          <Link href="/add-book" className="btn btn-primary mt-6">
            Add Your First Book
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {myBooks.map((book) => (
            <article key={book._id} className="card h-full border border-base-300 bg-base-100">
              <figure className="h-56 w-full overflow-hidden bg-base-200">
                <img src={book.image} alt={book.title} className="h-full w-full object-cover" />
              </figure>
              <div className="card-body gap-2 p-4">
                <span className="badge badge-secondary badge-sm">{book.category}</span>
                <h2 className="card-title line-clamp-1 text-base">{book.title}</h2>
                <p className="text-sm opacity-70">by {book.author}</p>
                <p className="text-xs opacity-70">
                  {book.copies} of {book.totalCopies} copies available
                </p>
                <div className="card-actions mt-auto grid grid-cols-2 gap-2">
                  <button type="button" className="btn btn-outline btn-sm" onClick={() => setEditing(book)}>
                    Edit
                  </button>
                  <button type="button" className="btn btn-error btn-sm" onClick={() => setDeleting(book)}>
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 px-4 py-8">
          <form onSubmit={handleSave} className="card w-full max-w-lg bg-base-100 shadow-xl">
            <div className="card-body gap-3">
              <h2 className="text-xl font-bold">Edit Book</h2>

              <label className="floating-label">
                <span>Book Title</span>
                <input
                  type="text"
                  name="title"
                  value={editing.title}
                  onChange={handleEditChange}
                  className="input input-bordered w-full"
                  required
                />
              </label>

              <label className="floating-label">
                <span>Author Name</span>
                <input
                  type="text"
                  name="author"
                  value={editing.author}
                  onChange={handleEditChange}
                  className="input input-bordered w-full"
                  required
                />
              </label>

              <div className="grid gap-3 sm:grid-cols-2">
                <select
                  name="category"
                  value={editing.category}
                  onChange={handleEditChange}
                  className="select select-bordered w-full"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  name="totalCopies"
                  min="1"
                  value={editing.totalCopies}
                  onChange={handleEditChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <input
                type="url"
                name="image"
                value={editing.image}
                onChange={handleEditChange}
                className="input input-bordered w-full"
                required
              />

              <textarea
                name="description"
                value={editing.description}
                onChange={handleEditChange}
                className="textarea textarea-bordered h-24 w-full"
                required
              />

              <div className="card-actions justify-end">
                <button type="button" className="btn btn-ghost" onClick={() => setEditing(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {deleting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="card w-full max-w-sm bg-base-100 shadow-xl">
            <div className="card-body gap-3">
              <h2 className="text-xl font-bold">Delete this book?</h2>
              <p className="text-sm opacity-70">
                {deleting.title} will be removed from the library for everyone. This cannot be undone.
              </p>
              <div className="card-actions justify-end">
                <button type="button" className="btn btn-ghost" onClick={() => setDeleting(null)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-error" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
