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
    

    const logs = await CommunicationLog.find({ campaign_id: campaignId }).sort({
      delivery_time: -1,
    });
     

    return NextResponse.json({ logs });
  } catch (error) {
    console.error("Error fetching communication logs:", error);
    return NextResponse.json(
      { error: "Failed to fetch communication logs" },
      { status: 500 }
    );
  }
}
