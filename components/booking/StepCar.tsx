"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn, calculateDuration, calculatePrice, formatCurrency } from "@/lib/utils";
import { fleet } from "@/data/fleet";
import type { BookingState, BookingAction } from "@/lib/types";

interface StepCarProps {
  state: BookingState;
  dispatch: React.Dispatch<BookingAction>;
  onNext: () => void;
  onBack: () => void;
}

function CheckBadge() {
  return (
    <div className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-white shadow-md">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </div>
  );
}

export function StepCar({ state, dispatch, onNext, onBack }: StepCarProps) {
  const [error, setError] = useState("");

  const duration =
    state.pickupDate && state.returnDate
      ? calculateDuration(state.pickupDate, state.returnDate)
      : 1;

  function handleSelect(carId: string) {
    dispatch({ type: "SET_CAR", carId });
    setError("");
  }

  function handleContinue() {
    if (!state.selectedCarId) {
      setError("Please select a car to continue");
      return;
    }
    onNext();
  }

  return (
    <div className="space-y-6">
      {error && (
        <p className="text-center text-sm text-error" role="alert">
          {error}
        </p>
      )}

      {/* Car grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {fleet.map((car) => {
          const isSelected = state.selectedCarId === car.id;
          const totalPrice = calculatePrice(car.dailyRate, car.weeklyRate, duration);

          return (
            <Card
              key={car.id}
              className={cn(
                "relative cursor-pointer transition-all",
                isSelected && "border-2 border-accent shadow-md",
                !car.available && "cursor-not-allowed opacity-50",
              )}
              onClick={() => car.available && handleSelect(car.id)}
              role="button"
              tabIndex={car.available ? 0 : -1}
              aria-pressed={isSelected}
              aria-disabled={!car.available}
              onKeyDown={(e) => {
                if (car.available && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  handleSelect(car.id);
                }
              }}
            >
              {isSelected && <CheckBadge />}

              {/* Car image */}
              <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {!car.available && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-text">
                      Unavailable
                    </span>
                  </div>
                )}
              </div>

              <CardContent className="space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-bold text-text">{car.name}</h3>
                  <span className="rounded-full bg-surface px-2 py-0.5 text-xs font-medium capitalize text-text-muted">
                    {car.category}
                  </span>
                </div>

                {/* Specs */}
                <div className="flex flex-wrap gap-3 text-sm text-text-muted">
                  <span className="flex items-center gap-1">
                    <UsersIcon />
                    {car.passengers}
                  </span>
                  <span className="flex items-center gap-1">
                    <GearIcon />
                    {car.transmission}
                  </span>
                  <span className="flex items-center gap-1">
                    <FuelIcon />
                    {car.fuel}
                  </span>
                  <span className="flex items-center gap-1">
                    <BagIcon />
                    {car.bags} {car.bags === 1 ? "bag" : "bags"}
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-end justify-between border-t border-border pt-3">
                  <div>
                    <p className="text-xs text-text-muted">
                      {formatCurrency(car.dailyRate)}/day
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-text-muted">
                      {duration} {duration === 1 ? "day" : "days"} total
                    </p>
                    <p className="text-lg font-bold text-primary">
                      {formatCurrency(totalPrice)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" size="lg" onClick={onBack}>
          Back
        </Button>
        <Button type="button" variant="accent" size="lg" onClick={handleContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
}

/* ----------------------------- Inline Icons ----------------------------- */

function UsersIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
      <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M12 2v2" />
      <path d="M12 22v-2" />
      <path d="m17 20.66-1-1.73" />
      <path d="M11 10.27 7 3.34" />
    </svg>
  );
}

function FuelIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 22V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v17" />
      <path d="M15 22H3" />
      <path d="M15 10h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 4" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
