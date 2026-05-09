"use client";

import Image from "next/image";
import { formatCurrency, cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const plans = [
  {
    name: "Compact",
    description: "Ideal for getting around the city and short trips",
    dailyRate: 25,
    weeklyRate: 150,
    features: [
      "Full insurance included",
      "Roadside assistance",
      "Flexible pickup & drop-off",
      "WhatsApp support",
    ],
  },
  {
    name: "SUV",
    description: "Comfort and space for exploring the islands",
    dailyRate: 35,
    weeklyRate: 210,
    popular: true,
    features: [
      "Full insurance included",
      "Roadside assistance",
      "Flexible pickup & drop-off",
      "WhatsApp support",
      "GPS navigation included",
      "Airport delivery",
    ],
  },
  {
    name: "Off-road / 4x4",
    description: "Built for the islands' unique terrain and trails",
    dailyRate: 40,
    weeklyRate: 245,
    features: [
      "Full insurance included",
      "Roadside assistance",
      "Flexible pickup & drop-off",
      "WhatsApp support",
      "GPS navigation included",
      "Airport delivery",
      "Perfect for unpaved roads",
    ],
  },
];

const featuredVehicle = {
  name: "Suzuki Jimny",
  image:
    "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&h=400&fit=crop",
  dailyRate: 40,
  features: [
    "Full insurance included",
    "4x4 all-terrain capability",
    "Roadside assistance",
    "GPS navigation",
    "Perfect for island roads",
    "WhatsApp support",
  ],
};

export function Pricing() {
  const featuredCar = featuredVehicle;

  const handleScrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pricing" className="bg-white px-4 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-16 text-center">
          <h2 className="font-serif text-4xl italic text-primary md:text-5xl">
            Best offer <span className="text-accent">&#10022;</span>
          </h2>
        </div>

        {/* Featured car highlight */}
        <div className="mb-20 overflow-hidden rounded-2xl bg-primary-dark">
          <div className="grid grid-cols-1 items-center lg:grid-cols-2">
            {/* Image side */}
            <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full">
              <Image
                src={featuredCar.image}
                alt={featuredCar.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Details side */}
            <div className="p-8 md:p-12 lg:p-16">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent-light">
                Most Popular on the Island
              </span>
              <h3 className="mt-3 font-serif text-3xl italic text-white md:text-4xl">
                {featuredCar.name}
              </h3>
              <p className="mt-4 text-lg text-white/70">
                From{" "}
                <span className="text-2xl font-semibold text-accent">
                  {formatCurrency(featuredCar.dailyRate)}
                </span>
                <span className="text-white/50">/day</span>
              </p>

              {/* Feature list */}
              <ul className="mt-8 space-y-3">
                {featuredCar.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-sm text-white/80"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <Button variant="accent" size="lg" onClick={handleScrollToBooking}>
                  Reserve Now
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing tier cards */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-white p-8 transition-shadow",
                plan.popular
                  ? "border-2 border-accent shadow-lg md:scale-[1.03]"
                  : "border-border"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  Most Popular
                </div>
              )}

              {/* Plan name & description */}
              <div className="mb-6 text-center">
                <h3 className="text-lg font-semibold text-primary">
                  {plan.name}
                </h3>
                <p className="mt-1 text-sm text-text-muted">
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-8 text-center">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-primary">
                    &euro;{plan.dailyRate}
                  </span>
                  <span className="text-text-muted">/day</span>
                </div>
                <p className="mt-1 text-sm text-text-muted">
                  or &euro;{plan.weeklyRate}/week
                </p>
              </div>

              {/* Features */}
              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm text-text"
                  >
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant="outline"
                className="w-full"
                onClick={handleScrollToBooking}
              >
                Book Now
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
