"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { BookingSummary } from "@/components/booking/BookingSummary";
import type { BookingState, Car } from "@/lib/types";

interface StepPaymentProps {
  state: BookingState;
  onBack: () => void;
  selectedCar: Car | undefined;
}

export function StepPayment({ state, onBack, selectedCar }: StepPaymentProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleConfirm() {
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pickupDate: state.pickupDate,
          returnDate: state.returnDate,
          pickupTime: state.pickupTime,
          pickupLocation: state.pickupLocation,
          selectedCarId: state.selectedCarId,
          customerName: state.customerName,
          customerEmail: state.customerEmail,
          customerPhone: state.customerPhone,
          licenseNumber: state.licenseNumber,
          notes: state.notes,
        }),
      });

      if (!response.ok) {
        throw new Error("Booking submission failed");
      }

      const data = await response.json();
      router.push(`/booking-success?id=${data.confirmationId}`);
    } catch {
      setError(
        "Something went wrong while processing your booking. Please try again.",
      );
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      {/* Summary */}
      <BookingSummary state={state} car={selectedCar} />

      {/* Customer details recap */}
      <div className="rounded-xl border border-border bg-white p-6">
        <h3 className="mb-4 text-lg font-bold text-primary">
          Customer Details
        </h3>
        <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-text-muted">Name</dt>
            <dd className="font-medium text-text">{state.customerName}</dd>
          </div>
          <div>
            <dt className="text-text-muted">Email</dt>
            <dd className="font-medium text-text">{state.customerEmail}</dd>
          </div>
          <div>
            <dt className="text-text-muted">Phone</dt>
            <dd className="font-medium text-text">{state.customerPhone}</dd>
          </div>
          {state.licenseNumber && (
            <div>
              <dt className="text-text-muted">Driver&apos;s License</dt>
              <dd className="font-medium text-text">{state.licenseNumber}</dd>
            </div>
          )}
          {state.notes && (
            <div className="sm:col-span-2">
              <dt className="text-text-muted">Special Requests</dt>
              <dd className="font-medium text-text">{state.notes}</dd>
            </div>
          )}
        </dl>
      </div>

      {/* Error */}
      {error && (
        <div
          className="rounded-lg border border-error/20 bg-error/5 p-4 text-sm text-error"
          role="alert"
        >
          {error}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={onBack}
          disabled={isSubmitting}
        >
          Back
        </Button>
        <Button
          type="button"
          variant="accent"
          size="lg"
          onClick={handleConfirm}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <LoadingSpinner />
              Processing...
            </span>
          ) : (
            "Confirm & Pay"
          )}
        </Button>
      </div>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
