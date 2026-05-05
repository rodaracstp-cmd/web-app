"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import {
  formatDate,
  formatCurrency,
  calculateDuration,
  calculatePrice,
} from "@/lib/utils";
import type { BookingState, Car } from "@/lib/types";

interface BookingSummaryProps {
  state: BookingState;
  car: Car | undefined;
}

export function BookingSummary({ state, car }: BookingSummaryProps) {
  const hasDates = state.pickupDate && state.returnDate;
  const duration = hasDates
    ? calculateDuration(state.pickupDate, state.returnDate)
    : 0;
  const totalPrice =
    car && duration > 0
      ? calculatePrice(car.dailyRate, car.weeklyRate, duration)
      : 0;

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <h3 className="text-lg font-bold text-primary">Booking Summary</h3>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Car info */}
        {car && (
          <div className="space-y-2">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={car.image}
                alt={car.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 320px"
              />
            </div>
            <p className="text-base font-semibold text-text">{car.name}</p>
          </div>
        )}

        {/* Details list */}
        <dl className="space-y-2 text-sm">
          {state.pickupLocation && (
            <div className="flex justify-between">
              <dt className="text-text-muted">Location</dt>
              <dd className="font-medium text-text">{state.pickupLocation}</dd>
            </div>
          )}

          {state.pickupDate && (
            <div className="flex justify-between">
              <dt className="text-text-muted">Pickup</dt>
              <dd className="font-medium text-text">
                {formatDate(state.pickupDate)}
              </dd>
            </div>
          )}

          {state.returnDate && (
            <div className="flex justify-between">
              <dt className="text-text-muted">Return</dt>
              <dd className="font-medium text-text">
                {formatDate(state.returnDate)}
              </dd>
            </div>
          )}

          {state.pickupTime && (
            <div className="flex justify-between">
              <dt className="text-text-muted">Pickup Time</dt>
              <dd className="font-medium text-text">{state.pickupTime}</dd>
            </div>
          )}

          {duration > 0 && (
            <div className="flex justify-between">
              <dt className="text-text-muted">Duration</dt>
              <dd className="font-medium text-text">
                {duration} {duration === 1 ? "day" : "days"}
              </dd>
            </div>
          )}

          {car && (
            <div className="flex justify-between">
              <dt className="text-text-muted">Daily Rate</dt>
              <dd className="font-medium text-text">
                {formatCurrency(car.dailyRate)}
              </dd>
            </div>
          )}
        </dl>

        {/* Total */}
        {totalPrice > 0 && (
          <div className="border-t border-border pt-3">
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-text">Total</span>
              <span className="text-xl font-bold text-primary">
                {formatCurrency(totalPrice)}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
