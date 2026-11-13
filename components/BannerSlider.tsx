"use client";

import Link from "next/link";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    title: "Find Your Next Favourite Book",
    text: "Browse a small but growing shelf of stories, science and history picked by our readers.",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Borrow In Two Clicks",
    text: "Open a book, confirm the dates and it is yours for the next few days. Return it when you are done.",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Share The Books You Love",
    text: "Add a book to the library with its cover picture and a short note, so another reader can pick it up.",
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1600&q=80",
  },
];

export default function BannerSlider() {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
      loop
      className="h-[420px] w-full sm:h-[520px]"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.title}>
          <div className="relative h-full w-full">
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/55" />
            <div className="absolute inset-0 flex items-center">
              <div className="mx-auto w-full max-w-6xl px-4 text-white">
                <p className="badge badge-primary badge-outline border-white/40 text-white">
                  BookNook Library
                </p>
                <h1 className="mt-4 max-w-2xl font-serif text-3xl font-bold sm:text-5xl">
                  {slide.title}
                </h1>
                <p className="mt-4 max-w-xl text-sm text-white/85 sm:text-base">
                  {slide.text}
                </p>
                <Link href="/books" className="btn btn-primary mt-6">
                  Browse Books
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
