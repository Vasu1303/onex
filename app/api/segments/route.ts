import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Segment from "@/models/Segment";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  try {
    const session= await auth()
    const body = await req.json();
    const { segment_name, rules, combinator, size } = body;

    await connectDB();

    const newSegment = await Segment.create({
      segment_name,
      rules,
      combinator,
      size,
      created_by: session?.user?.name,
      
    });

    return NextResponse.json({ message: "Segment Saved", segment: newSegment });
  } catch (error) {
    console.error("Error Saving Segment", error);
    return NextResponse.json(
      { error: "Failed to save the segment" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const session = await auth();
  await connectDB();
  const query = { created_by: session?.user?.name };
  const data = await Segment.find(query);

  return NextResponse.json({
    data,
    messgae: "All okay",
  });
}
