import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import CommunicationLog from "@/models/CommunicationLogs";

export async function GET(
  req: NextRequest,
  { params }: { params: { campaignId: string } }
) {
  try {
    const { campaignId } = params;
    await connectDB();
    console.log("Fetching logs for campaign:", campaignId); // Debug log

    const logs = await CommunicationLog.find({ campaign_id: campaignId }).sort({
      delivery_time: -1,
    });
     console.log("Found logs:", logs.length); // Debug log

    return NextResponse.json({ logs });
  } catch (error) {
    console.error("Error fetching communication logs:", error);
    return NextResponse.json(
      { error: "Failed to fetch communication logs" },
      { status: 500 }
    );
  }
}
