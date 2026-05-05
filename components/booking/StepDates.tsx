"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { getPickupTimes } from "@/lib/utils";
import { locations } from "@/data/fleet";
import type { BookingState, BookingAction } from "@/lib/types";

interface StepDatesProps {
  state: BookingState;
  dispatch: React.Dispatch<BookingAction>;
  onNext: () => void;
}

interface ValidationErrors {
  pickupDate?: string;
  returnDate?: string;
  pickupTime?: string;
  pickupLocation?: string;
}

export function StepDates({ state, dispatch, onNext }: StepDatesProps) {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const pickupTimes = getPickupTimes();

  function validate(): boolean {
    const newErrors: ValidationErrors = {};

    if (!state.pickupDate) {
      newErrors.pickupDate = "Pickup date is required";
    }

    if (!state.returnDate) {
      newErrors.returnDate = "Return date is required";
    }

    if (
      state.pickupDate &&
      state.returnDate &&
      new Date(state.returnDate) <= new Date(state.pickupDate)
    ) {
      newErrors.returnDate = "Return date must be after pickup date";
    }

    if (!state.pickupTime) {
      newErrors.pickupTime = "Pickup time is required";
    }

    if (!state.pickupLocation) {
      newErrors.pickupLocation = "Pickup location is required";
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

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Pickup date */}
        <Input
          label="Pickup Date"
          type="date"
          value={state.pickupDate}
          error={errors.pickupDate}
          onChange={(e) =>
            dispatch({
              type: "SET_DATES",
              pickupDate: e.target.value,
              returnDate: state.returnDate,
            })
          }
        />

        {/* Return date */}
        <Input
          label="Return Date"
          type="date"
          value={state.returnDate}
          error={errors.returnDate}
          onChange={(e) =>
            dispatch({
              type: "SET_DATES",
              pickupDate: state.pickupDate,
              returnDate: e.target.value,
            })
          }
        />
      </div>

      {/* Pickup time */}
      <div className="flex flex-col gap-1.5">
        <Select
          label="Pickup Time"
          value={state.pickupTime}
          onValueChange={(value) =>
            dispatch({ type: "SET_PICKUP_TIME", pickupTime: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select pickup time" />
          </SelectTrigger>
          <SelectContent>
            {pickupTimes.map((time) => (
              <SelectItem key={time} value={time}>
                {time}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.pickupTime && (
          <p className="text-sm text-error" role="alert">
            {errors.pickupTime}
          </p>
        )}
      </div>

      {/* Pickup location */}
      <div className="flex flex-col gap-1.5">
        <Select
          label="Pickup Location"
          value={state.pickupLocation || undefined}
          onValueChange={(value) =>
            dispatch({ type: "SET_LOCATION", pickupLocation: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a location" />
          </SelectTrigger>
          <SelectContent>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.pickupLocation && (
          <p className="text-sm text-error" role="alert">
            {errors.pickupLocation}
          </p>
        )}
      </div>

      {/* Continue button */}
      <div className="flex justify-end pt-4">
        <Button type="submit" variant="accent" size="lg">
          Continue
        </Button>
      </div>
    </form>
  );
}
