import { NextResponse } from "next/server";
import { generateConfirmationId } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Basic validation: check required fields
    const requiredFields = [
      "pickupDate",
      "returnDate",
      "pickupTime",
      "pickupLocation",
      "selectedCarId",
      "customerName",
      "customerEmail",
      "customerPhone",
    ];

    const missingFields = requiredFields.filter(
      (field) => !body[field] || (typeof body[field] === "string" && body[field].trim() === ""),
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          missingFields,
        },
        { status: 400 },
      );
    }

    const confirmationId = generateConfirmationId();

    // Log the booking (mock persistence)
    console.log("New booking received:", {
      confirmationId,
      ...body,
    });

    return NextResponse.json({
      confirmationId,
      status: "confirmed",
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
}
