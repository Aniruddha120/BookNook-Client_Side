import { Suspense } from "react";
import BookDetails from "@/components/BookDetails";
import Spinner from "@/components/Spinner";

export const metadata = {
  title: "BookNook | Book Details",
};

export default function BookDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<Spinner />}>
      <BookDetails params={params} />
    </Suspense>
  );
}
