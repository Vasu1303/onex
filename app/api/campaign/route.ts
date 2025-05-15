import { connectDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Campaign from "@/models/Campaign";
import { auth } from "@/auth";



export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Received campaign data:", body);

    const {
      campaign_name,
      segment_id,
      segment_name,
      message,
      sent_count,
      failed_count,
      created_by,
    } = body;

    await connectDB();

    // Create campaign with all fields including campaign_name
    const newCampaign = await Campaign.create({
      campaign_name,
      segment_id,
      segment_name,
      message,
      sent_count,
      failed_count,
      created_by,
    });

    console.log("Created campaign:", newCampaign);
    return NextResponse.json({
      message: "Campaign Saved",
      campaign: newCampaign,
    });
  } catch (error) {
    console.error("Error Saving Campaign", error);
    return NextResponse.json(
      { error: "Error saving campaign" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const session = await auth();
  const userName =  session?.user?.name;
  await connectDB();
  const campaigns = await Campaign.find({ created_by: userName || "Dummy User" }).sort({
    created_at: -1,
  });

  return NextResponse.json({ campaigns });
}
