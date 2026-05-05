"use client";

import { useState } from "react";

const CATEGORIES = ["Sedan", "SUV", "Coupe", "Convertible", "Electric", "Sports"];

export default function Hero() {
  const [location, setLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center bg-primary-dark"
    >
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&h=1080&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/70 via-primary-dark/50 to-primary-dark/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pt-32 pb-24 text-center">
        {/* Main heading */}
        <h1 className="font-serif text-5xl leading-tight text-white italic md:text-7xl md:leading-tight">
          Luxury car
          <br />
          rental in Portugal
        </h1>

        {/* Tagline */}
        <p className="mx-auto mt-6 max-w-lg text-lg text-white/60">
          Experience the art of driving with our curated collection of premium vehicles.
        </p>

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className="mx-auto mt-12 max-w-4xl"
        >
          <div className="flex flex-col gap-3 rounded-full border border-white/20 bg-white/10 p-2 backdrop-blur-md md:flex-row md:items-center md:gap-0">
            {/* Location */}
            <div className="flex flex-1 items-center gap-2 px-4 py-2 md:border-r md:border-white/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5 shrink-0 text-white/40"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Pickup location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent text-sm text-white placeholder-white/40 outline-none"
                aria-label="Pickup location"
              />
            </div>

            {/* Pickup date */}
            <div className="flex flex-1 items-center gap-2 px-4 py-2 md:border-r md:border-white/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5 shrink-0 text-white/40"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                />
              </svg>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full bg-transparent text-sm text-white placeholder-white/40 outline-none [color-scheme:dark]"
                aria-label="Pickup date"
              />
            </div>

            {/* Return date */}
            <div className="flex flex-1 items-center gap-2 px-4 py-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5 shrink-0 text-white/40"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                />
              </svg>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full bg-transparent text-sm text-white placeholder-white/40 outline-none [color-scheme:dark]"
                aria-label="Return date"
              />
            </div>

            {/* Search button */}
            <button
              type="submit"
              className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              Search
            </button>
          </div>
        </form>

        {/* Category pills */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-medium tracking-wider text-white/80 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
