import { authClient } from "@/lib/auth-client";

export const API_URL: string =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function getToken(): Promise<string> {
  const { data } = await authClient.$fetch("/token");
  const token = (data as { token?: string } | null)?.token;
  return token || "";
}

export async function authFetch(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = await getToken();

  return fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers as Record<string, string>),
    },
  });
}
