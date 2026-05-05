"use client";

import { useReducer, useCallback } from "react";
import { ProgressBar } from "@/components/booking/ProgressBar";
import { StepDates } from "@/components/booking/StepDates";
import { StepCar } from "@/components/booking/StepCar";
import { StepDetails } from "@/components/booking/StepDetails";
import { StepPayment } from "@/components/booking/StepPayment";
import { fleet } from "@/data/fleet";
import type { BookingState, BookingAction } from "@/lib/types";

const TOTAL_STEPS = 4;

function bookingReducer(
  state: BookingState,
  action: BookingAction,
): BookingState {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, step: action.step };
    case "SET_DATES":
      return {
        ...state,
        pickupDate: action.pickupDate,
        returnDate: action.returnDate,
      };
    case "SET_PICKUP_TIME":
      return { ...state, pickupTime: action.pickupTime };
    case "SET_LOCATION":
      return { ...state, pickupLocation: action.pickupLocation };
    case "SET_CAR":
      return { ...state, selectedCarId: action.carId };
    case "SET_CUSTOMER_INFO":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return createInitialState();
    default:
      return state;
  }
}

function createInitialState(overrides?: Partial<BookingState>): BookingState {
  return {
    step: 1,
    pickupDate: "",
    returnDate: "",
    pickupTime: "09:00",
    pickupLocation: "",
    selectedCarId: null,
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    licenseNumber: "",
    notes: "",
    ...overrides,
  };
}

interface BookingProps {
  selectedCarId?: string;
  pickupDate?: string;
  returnDate?: string;
}

export default function Booking({
  selectedCarId,
  pickupDate,
  returnDate,
}: BookingProps) {
  const [state, dispatch] = useReducer(
    bookingReducer,
    createInitialState({
      selectedCarId: selectedCarId ?? null,
      pickupDate: pickupDate ?? "",
      returnDate: returnDate ?? "",
      step: selectedCarId ? 2 : 1,
    }),
  );

  const selectedCar = fleet.find((c) => c.id === state.selectedCarId);

  const goNext = useCallback(() => {
    dispatch({ type: "SET_STEP", step: Math.min(state.step + 1, TOTAL_STEPS) });
  }, [state.step]);

  const goBack = useCallback(() => {
    dispatch({ type: "SET_STEP", step: Math.max(state.step - 1, 1) });
  }, [state.step]);

  return (
    <section id="booking" className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-primary md:text-4xl">
            Book Your Ride
          </h2>
          <p className="mt-3 text-lg text-text-muted">
            Complete the steps below to reserve your vehicle
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-10">
          <ProgressBar currentStep={state.step} totalSteps={TOTAL_STEPS} />
        </div>

        {/* Step content */}
        <div className="mt-8">
          {state.step === 1 && (
            <StepDates state={state} dispatch={dispatch} onNext={goNext} />
          )}
          {state.step === 2 && (
            <StepCar
              state={state}
              dispatch={dispatch}
              onNext={goNext}
              onBack={goBack}
            />
          )}
          {state.step === 3 && (
            <StepDetails
              state={state}
              dispatch={dispatch}
              onNext={goNext}
              onBack={goBack}
              selectedCar={selectedCar}
            />
          )}
          {state.step === 4 && (
            <StepPayment
              state={state}
              onBack={goBack}
              selectedCar={selectedCar}
            />
          )}
        </div>
      </div>
    </section>
  );
}
