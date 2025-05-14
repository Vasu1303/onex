import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { customer } = body;

  // Simulate random success/failure (90% chance success)
  const isSuccess = Math.random() < 0.9;
  const status = isSuccess ? "SENT" : "FAILED";


  // Simulate hitting Delivery Receipt API
  await fetch("http://localhost:3000/api/delivery-receipt", {
    method: "POST",
    body: JSON.stringify({
      customer_id: customer.customer_id,
      status,
    }),
    headers: { "Content-Type": "application/json" },
  });

  return NextResponse.json({ status });
}
