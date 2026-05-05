"use client";

import { useState } from "react";
import Image from "next/image";
import { fleet, categories } from "@/data/fleet";
import { formatCurrency, cn } from "@/lib/utils";

export default function Fleet() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredFleet =
    activeCategory === "all"
      ? fleet
      : fleet.filter((car) => car.category === activeCategory);

  const handleScrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="fleet" className="bg-cream px-4 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-12 text-center">
          <h2 className="font-serif text-4xl italic text-primary md:text-5xl">
            Vehicles
          </h2>
        </div>

        {/* Category filter pills */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium transition-colors",
                activeCategory === category.id
                  ? "bg-primary text-white"
                  : "border border-border bg-transparent text-text-muted hover:border-primary hover:text-primary"
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Car cards grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredFleet.map((car, index) => (
            <div
              key={car.id}
              className={cn(
                "group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02] opacity-0 animate-fade-in",
                !car.available && "opacity-60"
              )}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Car image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
                {!car.available && (
                  <div className="absolute left-3 top-3 rounded-full bg-error px-3 py-1 text-xs font-semibold text-white">
                    Unavailable
                  </div>
                )}
              </div>

              {/* Card body */}
              <div className="flex items-end justify-between p-5">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                    {car.category}
                  </span>
                  <h3 className="mt-0.5 text-lg font-medium text-text">
                    {car.name}
                  </h3>
                  <p className="mt-1 text-sm text-text-muted">
                    From{" "}
                    <span className="font-semibold text-text">
                      {formatCurrency(car.dailyRate)}
                    </span>
                    /day
                  </p>
                </div>

                {/* Arrow button */}
                <button
                  onClick={handleScrollToBooking}
                  disabled={!car.available}
                  aria-label={`Book ${car.name}`}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary-dark disabled:pointer-events-none disabled:opacity-50"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
