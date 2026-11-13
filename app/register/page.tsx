"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import GoogleButton from "@/components/GoogleButton";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({ name: "", email: "", photoURL: "", password: "" });
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "BookNook | Register";
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const validatePassword = (password: string) => {
    if (!/[A-Z]/.test(password)) {
      return "Password must have an uppercase letter";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must have a lowercase letter";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }
    return "";
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const passwordMessage = validatePassword(form.password);
    setPasswordError(passwordMessage);

    if (passwordMessage) {
      return;
    }

    setLoading(true);

    const { error: registerError } = await authClient.signUp.email({
      name: form.name,
      email: form.email,
      password: form.password,
      image: form.photoURL,
    });

    setLoading(false);

    if (registerError) {
      setError(registerError.message || "Registration failed");
      toast.error(registerError.message || "Registration failed");
      return;
    }

    toast.success("Account created. Please login.");
    router.push("/login");
  };

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="card w-full max-w-md border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body gap-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Register</h1>
            <p className="mt-1 text-sm opacity-70">Create an account and start borrowing.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <label className="floating-label">
              <span>Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="input input-bordered w-full"
                required
              />
            </label>

            <label className="floating-label">
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="input input-bordered w-full"
                required
              />
            </label>

            <label className="floating-label">
              <span>Photo URL</span>
              <input
                type="url"
                name="photoURL"
                value={form.photoURL}
                onChange={handleChange}
                placeholder="https://example.com/photo.jpg"
                className="input input-bordered w-full"
                required
              />
            </label>

            <label className="floating-label">
              <span>Password</span>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                className="input input-bordered w-full"
                required
              />
            </label>

            {passwordError && <p className="text-sm text-error">{passwordError}</p>}
            {error && <p className="text-sm text-error">{error}</p>}

            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>

          <div className="divider my-0 text-xs">OR</div>

          <GoogleButton redirectTo="/" />

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="link link-primary">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
