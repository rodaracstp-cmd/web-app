"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { BookingSummary } from "@/components/booking/BookingSummary";
import type { BookingState, BookingAction, Car } from "@/lib/types";

interface StepDetailsProps {
  state: BookingState;
  dispatch: React.Dispatch<BookingAction>;
  onNext: () => void;
  onBack: () => void;
  selectedCar: Car | undefined;
}

interface ValidationErrors {
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function StepDetails({
  state,
  dispatch,
  onNext,
  onBack,
  selectedCar,
}: StepDetailsProps) {
  const [errors, setErrors] = useState<ValidationErrors>({});

  function validate(): boolean {
    const newErrors: ValidationErrors = {};

    if (!state.customerName.trim()) {
      newErrors.customerName = "Full name is required";
    }

    if (!state.customerEmail.trim()) {
      newErrors.customerEmail = "Email is required";
    } else if (!EMAIL_REGEX.test(state.customerEmail)) {
      newErrors.customerEmail = "Please enter a valid email address";
    }

    if (!state.customerPhone.trim()) {
      newErrors.customerPhone = "Phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) {
      onNext();
    }
  }

  function handleFieldChange(field: string, value: string) {
    dispatch({ type: "SET_CUSTOMER_INFO", field, value });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Form - left column */}
        <div className="space-y-5 lg:col-span-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Full Name"
              name="customerName"
              value={state.customerName}
              error={errors.customerName}
              placeholder="John Doe"
              required
              onChange={(e) =>
                handleFieldChange("customerName", e.target.value)
              }
            />

            <Input
              label="Email"
              name="customerEmail"
              type="email"
              value={state.customerEmail}
              error={errors.customerEmail}
              placeholder="john@example.com"
              required
              onChange={(e) =>
                handleFieldChange("customerEmail", e.target.value)
              }
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Phone"
              name="customerPhone"
              type="tel"
              value={state.customerPhone}
              error={errors.customerPhone}
              placeholder="+351 912 345 678"
              required
              onChange={(e) =>
                handleFieldChange("customerPhone", e.target.value)
              }
            />

            <Input
              label="Driver's License (optional)"
              name="licenseNumber"
              value={state.licenseNumber}
              placeholder="License number"
              onChange={(e) =>
                handleFieldChange("licenseNumber", e.target.value)
              }
            />
          </div>

          {/* Special requests textarea */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="notes"
              className="text-sm font-medium text-text"
            >
              Special Requests (optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              value={state.notes}
              placeholder="Child seat, GPS unit, or any other special requests..."
              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text placeholder:text-text-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              onChange={(e) => handleFieldChange("notes", e.target.value)}
            />
          </div>

          {/* Navigation */}
          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={onBack}
            >
              Back
            </Button>
            <Button type="submit" variant="accent" size="lg">
              Confirm &amp; Pay
            </Button>
          </div>
        </div>

        {/* Summary - right column */}
        <div className="order-first lg:order-last">
          <BookingSummary state={state} car={selectedCar} />
        </div>
      </div>
    </form>
  );
}
