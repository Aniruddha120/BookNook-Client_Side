import Link from "next/link";

export const metadata = {
  title: "BookNook | Page Not Found",
};

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center px-4 text-center">
      <p className="font-serif text-7xl font-bold text-primary">404</p>
      <h1 className="mt-4 text-2xl font-bold sm:text-3xl">This shelf is empty</h1>
      <p className="mt-3 max-w-md text-sm opacity-70">
        The page you are looking for is not in our library. It may have been moved or returned.
      </p>
      <Link href="/" className="btn btn-primary mt-8">
        Back to Home
      </Link>
    </section>
  );
}
