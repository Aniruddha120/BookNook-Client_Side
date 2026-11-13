"use client";

import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function GoogleButton({ redirectTo = "/" }: { redirectTo?: string }) {
  const handleGoogleLogin = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: redirectTo,
    });

    if (error) {
      toast.error(error.message || "Google login failed");
    }
  };

  return (
    <button type="button" onClick={handleGoogleLogin} className="btn btn-outline w-full">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5">
        <path
          fill="#EA4335"
          d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.2C12.4 13.5 17.7 9.5 24 9.5Z"
        />
        <path
          fill="#4285F4"
          d="M46.1 24.5c0-1.6-.1-2.8-.4-4.1H24v8.4h12.5c-.3 2.1-1.5 5.2-4.4 7.3l7.7 6c4.5-4.2 6.3-10.2 6.3-17.6Z"
        />
        <path fill="#FBBC05" d="M10.5 28.6a14.5 14.5 0 0 1 0-9.2l-7.9-6.2a24 24 0 0 0 0 21.6l7.9-6.2Z" />
        <path
          fill="#34A853"
          d="M24 48c6.5 0 11.9-2.1 15.8-5.8l-7.7-6c-2.1 1.4-4.9 2.4-8.1 2.4-6.3 0-11.6-4-13.5-9.9l-7.9 6.2C6.5 42.6 14.6 48 24 48Z"
        />
      </svg>
      Continue with Google
    </button>
  );
}
