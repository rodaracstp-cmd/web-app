"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const stats = [
  { label: "Happy Customers", value: 5000, suffix: "+" },
  { label: "Premium Vehicles", value: 150, suffix: "+" },
  { label: "Locations", value: 5, suffix: "" },
  { label: "Years Experience", value: 12, suffix: "+" },
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
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop"
                alt="Person driving a car on a scenic road"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>

          {/* Text block */}
          <div className="col-span-2 flex flex-col justify-center rounded-2xl bg-white p-6 md:p-8">
            <p className="text-base leading-relaxed text-text-muted md:text-lg">
              Founded in Lisbon, Roda has been helping travelers explore Portugal
              and beyond for over a decade. We believe that renting a car should
              be simple, transparent, and enjoyable.
            </p>
            <p className="mt-4 text-base leading-relaxed text-text-muted md:text-lg">
              Our fleet is maintained to the highest standards, ensuring safety
              and comfort on every journey. From compact city cars to luxury
              sedans and spacious vans, we have the perfect vehicle for every
              adventure.
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
                src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=400&fit=crop"
                alt="Luxury sedan in urban setting"
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
                src="https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=400&h=400&fit=crop"
                alt="Premium SUV on the road"
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
              With locations at major airports and city centers across Portugal,
              picking up your rental has never been easier.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
