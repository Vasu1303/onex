import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { customer_id, status } = body;

  console.log(`📬 Delivery Receipt → Customer: ${customer_id}, Status: ${status}`);

  return NextResponse.json({ message: "Receipt logged" });
}
