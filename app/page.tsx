import { Suspense } from "react";
import BannerSlider from "@/components/BannerSlider";

export default function HomePage() {
  return (
    <Suspense fallback={<div className="h-[420px] w-full bg-base-200 sm:h-[520px]" />}>
      <BannerSlider />
    </Suspense>
  );
}
