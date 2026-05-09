"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const stats = [
  { label: "Happy Travelers", value: 500, suffix: "+" },
  { label: "Vehicles", value: 15, suffix: "+" },
  { label: "Pickup Points", value: 5, suffix: "" },
  { label: "Years Experience", value: 5, suffix: "+" },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(interval);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function About() {
  return (
    <section id="about" className="bg-surface px-4 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-12 text-center">
          <h2 className="font-serif text-4xl italic text-primary md:text-5xl">
            About Us
          </h2>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:grid-rows-[auto_auto_auto]">
          {/* Large image - spans 2 cols and 2 rows */}
          <div className="relative col-span-2 row-span-2 overflow-hidden rounded-2xl">
            <div className="aspect-[4/3] md:aspect-auto md:h-full">
              <Image
                src="https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&h=600&fit=crop"
                alt="Tropical island coastline in São Tomé and Príncipe"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>

          {/* Text block */}
          <div className="col-span-2 flex flex-col justify-center rounded-2xl bg-white p-6 md:p-8">
            <p className="text-base leading-relaxed text-text-muted md:text-lg">
              Based in the heart of S&atilde;o Tom&eacute; e Pr&iacute;ncipe, R&ocirc;da Rent-a-Car
              helps travelers discover one of Africa&apos;s best-kept secrets. We
              know every road, trail, and hidden beach across these stunning
              tropical islands.
            </p>
            <p className="mt-4 text-base leading-relaxed text-text-muted md:text-lg">
              From compact cars for getting around the capital to rugged 4x4s
              built for the islands&apos; unique terrain, our well-maintained fleet
              is ready for your adventure. Full insurance is included on every
              rental, so you can explore with peace of mind.
            </p>
          </div>

          {/* Stats badge */}
          <div className="col-span-1 flex flex-col items-center justify-center rounded-2xl bg-primary p-6 text-white">
            <span className="text-3xl font-bold md:text-4xl">
              <CountUp target={stats[3].value} suffix={stats[3].suffix} />
            </span>
            <span className="mt-1 text-center text-xs uppercase tracking-wide text-white/70">
              Years of Experience
            </span>
          </div>

          {/* Small image 1 */}
          <div className="relative col-span-1 overflow-hidden rounded-2xl">
            <div className="aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400&h=400&fit=crop"
                alt="Lush tropical rainforest and palm trees"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>

          {/* Small image 2 */}
          <div className="relative col-span-1 overflow-hidden rounded-2xl">
            <div className="aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop"
                alt="Tropical beach with turquoise water"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>

          {/* Remaining stats */}
          <div className="col-span-1 flex flex-col items-center justify-center rounded-2xl bg-white p-6">
            <span className="text-3xl font-bold text-accent md:text-4xl">
              <CountUp target={stats[0].value} suffix={stats[0].suffix} />
            </span>
            <span className="mt-1 text-center text-xs uppercase tracking-wide text-text-muted">
              {stats[0].label}
            </span>
          </div>

          {/* Stats: Vehicles */}
          <div className="col-span-1 flex flex-col items-center justify-center rounded-2xl bg-white p-6">
            <span className="text-3xl font-bold text-accent md:text-4xl">
              <CountUp target={stats[1].value} suffix={stats[1].suffix} />
            </span>
            <span className="mt-1 text-center text-xs uppercase tracking-wide text-text-muted">
              {stats[1].label}
            </span>
          </div>

          {/* Stats: Locations */}
          <div className="col-span-1 flex flex-col items-center justify-center rounded-2xl bg-white p-6">
            <span className="text-3xl font-bold text-accent md:text-4xl">
              <CountUp target={stats[2].value} suffix={stats[2].suffix} />
            </span>
            <span className="mt-1 text-center text-xs uppercase tracking-wide text-text-muted">
              {stats[2].label}
            </span>
          </div>

          {/* Additional text block */}
          <div className="col-span-1 flex items-center justify-center rounded-2xl bg-primary-dark p-6 text-center">
            <p className="text-sm leading-relaxed text-white/80">
              From Praia Jal&eacute; to Pico C&atilde;o Grande, our team knows every corner
              of these islands and will help you plan the perfect route.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
