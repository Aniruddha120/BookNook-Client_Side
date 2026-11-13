"use client";

import { Suspense, useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import GoogleButton from "@/components/GoogleButton";
import Spinner from "@/components/Spinner";
import { authClient } from "@/lib/auth-client";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const { error: loginError } = await authClient.signIn.email({ email, password });

    setLoading(false);

    if (loginError) {
      setError(loginError.message || "Login failed");
      toast.error(loginError.message || "Login failed");
      return;
    }

    toast.success("Welcome back to BookNook");
    router.push(redirectTo);
  };

  return (
    <div className="card w-full max-w-md border border-base-300 bg-base-100 shadow-sm">
      <div className="card-body gap-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Login</h1>
          <p className="mt-1 text-sm opacity-70">Welcome back. Your shelf is waiting.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <label className="floating-label">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="input input-bordered w-full"
              required
            />
          </label>

          <label className="floating-label">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Your password"
              className="input input-bordered w-full"
              required
            />
          </label>

          <div className="text-right">
            <button
              type="button"
              className="link link-hover text-xs"
              onClick={() => toast("Password reset is not available yet")}
            >
              Forget Password?
            </button>
          </div>

          {error && <p className="text-sm text-error">{error}</p>}

          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="divider my-0 text-xs">OR</div>

        <GoogleButton redirectTo={redirectTo} />

        <p className="text-center text-sm">
          New to BookNook?{" "}
          <Link href="/register" className="link link-primary">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  useEffect(() => {
    document.title = "BookNook | Login";
  }, []);

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <Suspense fallback={<Spinner />}>
        <LoginForm />
      </Suspense>
    </section>
  );
}
