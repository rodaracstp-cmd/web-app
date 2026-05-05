import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { differenceInDays, format, parse } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateDuration(pickupDate: string, returnDate: string): number {
  const start = new Date(pickupDate);
  const end = new Date(returnDate);
  const days = differenceInDays(end, start);
  return Math.max(days, 1);
}

export function calculatePrice(dailyRate: number, weeklyRate: number, days: number): number {
  const fullWeeks = Math.floor(days / 7);
  const remainingDays = days % 7;
  return fullWeeks * weeklyRate + remainingDays * dailyRate;
}

export function formatDate(dateString: string): string {
  if (!dateString) return "";
  return format(new Date(dateString), "MMM dd, yyyy");
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

export function generateConfirmationId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `RODA-${timestamp}-${random}`;
}

export function getPickupTimes(): string[] {
  const times: string[] = [];
  for (let hour = 8; hour <= 20; hour++) {
    times.push(`${hour.toString().padStart(2, "0")}:00`);
    if (hour < 20) {
      times.push(`${hour.toString().padStart(2, "0")}:30`);
    }
  }
  return times;
}
