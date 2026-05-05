"use client";

import { cn } from "@/lib/utils";

const steps = ["Dates & Time", "Choose Car", "Your Details", "Payment"];

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

function CheckIcon() {
  return (
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
  );
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  return (
    <nav aria-label="Booking progress" className="w-full">
      <ol className="flex items-center justify-between">
        {steps.slice(0, totalSteps).map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <li
              key={label}
              className="flex flex-1 items-center"
            >
              <div className="flex flex-col items-center gap-2">
                {/* Circle */}
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors",
                    isCompleted &&
                      "border-accent bg-accent text-white",
                    isCurrent &&
                      "border-accent bg-white text-accent",
                    !isCompleted &&
                      !isCurrent &&
                      "border-gray-300 bg-white text-gray-400",
                  )}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {isCompleted ? <CheckIcon /> : stepNumber}
                </div>
                {/* Label */}
                <span
                  className={cn(
                    "hidden text-xs font-medium sm:block",
                    isCompleted && "text-accent",
                    isCurrent && "text-accent",
                    !isCompleted && !isCurrent && "text-text-muted",
                  )}
                >
                  {label}
                </span>
              </div>

              {/* Connector line */}
              {stepNumber < totalSteps && (
                <div
                  className={cn(
                    "mx-2 hidden h-0.5 flex-1 sm:block",
                    isCompleted ? "bg-accent" : "bg-gray-300",
                  )}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
