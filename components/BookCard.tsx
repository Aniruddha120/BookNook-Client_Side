import Link from "next/link";
import type { Book } from "@/lib/types";

export default function BookCard({ book }: { book: Book }) {
  return (
    <article className="card h-full border border-base-300 bg-base-100 shadow-sm">
      <figure className="h-56 w-full overflow-hidden bg-base-200">
        <img src={book.image} alt={book.title} className="h-full w-full object-cover" />
      </figure>
      <div className="card-body gap-2 p-4">
        <span className="badge badge-secondary badge-sm">{book.category}</span>
        <h3 className="card-title line-clamp-1 text-base">{book.title}</h3>
        <p className="text-sm opacity-70">by {book.author}</p>
        <div className="card-actions mt-auto">
          <Link href={`/books/${book._id}`} className="btn btn-primary btn-sm w-full">
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
