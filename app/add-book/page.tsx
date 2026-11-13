"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { authFetch } from "@/lib/api";
import Spinner from "@/components/Spinner";

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

export default function AddBookPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "Fiction",
    description: "",
    totalCopies: 1,
  });
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    document.title = "BookNook | Add Book";
  }, []);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_IMGBB_KEY;
    if (!apiKey) {
      toast.error("Image upload is not configured yet");
      return;
    }

    setUploading(true);
    const data = new FormData();
    data.append("image", file);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: data,
      });
      const result = await res.json();

      if (!result.success) {
        toast.error("Could not upload the image");
        return;
      }

      setImage(result.data.url);
      toast.success("Cover image uploaded");
    } catch (error) {
      toast.error("Could not upload the image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!image) {
      toast.error("Please upload a book cover image");
      return;
    }

    setSaving(true);
    const res = await authFetch("/books", {
      method: "POST",
      body: JSON.stringify({ ...form, image }),
    });
    const data = await res.json();
    setSaving(false);

    if (!res.ok) {
      toast.error(data.message || "Could not add the book");
      return;
    }

    toast.success("Book added to the library");
    router.push("/my-books");
  };

  if (isPending) {
    return <Spinner />;
  }

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-12">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary">Grow the shelf</p>
      <h1 className="mt-1 text-2xl font-bold sm:text-3xl">Add Book</h1>
      <p className="mt-2 text-sm opacity-70">Tell readers what the book is about and how many copies exist.</p>

      <form onSubmit={handleSubmit} className="card mt-8 border border-base-300 bg-base-100">
        <div className="card-body gap-4">
          <label className="floating-label">
            <span>Book Title</span>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="The Old Man and the Sea"
              className="input input-bordered w-full"
              required
            />
          </label>

          <label className="floating-label">
            <span>Author Name</span>
            <input
              type="text"
              name="author"
              value={form.author}
              onChange={handleChange}
              placeholder="Ernest Hemingway"
              className="input input-bordered w-full"
              required
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="floating-label">
              <span>Category</span>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <label className="floating-label">
              <span>Total Copies</span>
              <input
                type="number"
                name="totalCopies"
                min="1"
                value={form.totalCopies}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </label>
          </div>

          <div>
            <label className="label">
              <span className="label-text">Book Cover Image</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input file-input-bordered w-full"
              required={!image}
            />
            {uploading && <p className="mt-2 text-sm opacity-70">Uploading image...</p>}
            {image && (
              <img src={image} alt="Book cover preview" className="mt-3 h-40 w-28 rounded-box object-cover" />
            )}
          </div>

          <label className="floating-label">
            <span>Short Description</span>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="What is this book about?"
              className="textarea textarea-bordered h-28 w-full"
              required
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="floating-label">
              <span>Your Name</span>
              <input type="text" value={user?.name || ""} readOnly className="input input-bordered w-full" />
            </label>

            <label className="floating-label">
              <span>Your Email</span>
              <input type="email" value={user?.email || ""} readOnly className="input input-bordered w-full" />
            </label>
          </div>

          <button type="submit" className="btn btn-primary mt-2" disabled={saving || uploading}>
            {saving ? "Adding..." : "Add Book"}
          </button>
        </div>
      </form>
    </section>
  );
}
