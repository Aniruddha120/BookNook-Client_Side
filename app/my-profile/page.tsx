"use client";

import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import Spinner from "@/components/Spinner";

export default function MyProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    document.title = "BookNook | My Profile";
  }, []);

  if (isPending) {
    return <Spinner />;
  }

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-12">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary">Your account</p>
      <h1 className="mt-1 text-2xl font-bold sm:text-3xl">My Profile</h1>

      <div className="card mt-8 border border-base-300 bg-base-100">
        <div className="card-body flex-row items-center gap-6">
          <div className="avatar">
            <div className="w-20 rounded-full">
              {user?.image ? (
                <img src={user.image} alt={user.name} />
              ) : (
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-content">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold">{user?.name}</h2>
            <p className="text-sm opacity-70">{user?.email}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
