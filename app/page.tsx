import Link from "next/link";
import { Suspense } from "react";
import BannerSlider from "@/components/BannerSlider";
import NewArrivals from "@/components/NewArrivals";

const steps = [
  {
    title: "Browse the shelf",
    text: "Open the All Books page and read a short description of any book that catches your eye.",
  },
  {
    title: "Borrow it",
    text: "Press Borrow This Book, confirm your name and email, and the book is reserved for you.",
  },
  {
    title: "Return it",
    text: "When you finish reading, go to My Borrows and press Return Book to free it for others.",
  },
];

const categories = [
  { name: "Fiction", text: "Novels and short stories" },
  { name: "Science", text: "Space, biology and more" },
  { name: "History", text: "The world before us" },
  { name: "Kids", text: "Small books for small readers" },
  { name: "Others", text: "Poetry, essays and the rest" },
];

export default function HomePage() {
  return (
    <>
      <Suspense fallback={<div className="h-[420px] w-full bg-base-200 sm:h-[520px]" />}>
        <BannerSlider />
      </Suspense>
      <NewArrivals />

      <section className="bg-base-200 py-14">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">Simple by design</p>
            <h2 className="mt-1 text-2xl font-bold sm:text-3xl">How Borrowing Works</h2>
            <p className="mt-2 text-sm opacity-70">
              Three steps, no paperwork, and the book is back on the shelf when you return it.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="card h-full border border-base-300 bg-base-100">
                <div className="card-body gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-bold text-primary-content">
                    {index + 1}
                  </span>
                  <h3 className="card-title text-base">{step.title}</h3>
                  <p className="text-sm opacity-70">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-14">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">Pick a corner</p>
            <h2 className="mt-1 text-2xl font-bold sm:text-3xl">Top Categories</h2>
          </div>
          <Link href="/books" className="btn btn-outline btn-sm">
            Browse All Categories
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => (
            <Link
              key={category.name}
              href="/books"
              className="card h-full border border-base-300 bg-base-100 hover:border-primary"
            >
              <div className="card-body gap-1 p-5">
                <h3 className="card-title text-base">{category.name}</h3>
                <p className="text-xs opacity-70">{category.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
