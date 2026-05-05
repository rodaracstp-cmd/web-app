export interface Car {
  id: string;
  name: string;
  category: "economy" | "suv" | "luxury" | "van";
  image: string;
  passengers: number;
  transmission: "Automatic" | "Manual";
  fuel: "Petrol" | "Diesel" | "Hybrid" | "Electric";
  bags: number;
  doors: number;
  dailyRate: number;
  weeklyRate: number;
  available: boolean;
  features: string[];
}

export interface BookingState {
  step: number;
  pickupDate: string;
  returnDate: string;
  pickupTime: string;
  pickupLocation: string;
  selectedCarId: string | null;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  licenseNumber: string;
  notes: string;
}

export type BookingAction =
  | { type: "SET_STEP"; step: number }
  | { type: "SET_DATES"; pickupDate: string; returnDate: string }
  | { type: "SET_PICKUP_TIME"; pickupTime: string }
  | { type: "SET_LOCATION"; pickupLocation: string }
  | { type: "SET_CAR"; carId: string }
  | { type: "SET_CUSTOMER_INFO"; field: string; value: string }
  | { type: "RESET" };

export interface BookingConfirmation {
  confirmationId: string;
  status: "confirmed";
  car: Car;
  pickupDate: string;
  returnDate: string;
  pickupTime: string;
  pickupLocation: string;
  totalPrice: number;
}
