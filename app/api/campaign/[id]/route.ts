import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Campaign from "@/models/Campaign";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const campaignId = params.id;
    const { sent_count, failed_count } = await req.json();

    const updatedCampaign = await Campaign.findByIdAndUpdate(
      campaignId,
      {
        sent_count,
        failed_count,
      },
      { new: true }
    );

    if (!updatedCampaign) {
      return NextResponse.json(
        { error: "Campaign not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Campaign updated",
      campaign: updatedCampaign,
    });
  } catch (err) {
    console.error("Error updating campaign:", err);
    return NextResponse.json(
      { error: "Failed to update campaign" },
      { status: 500 }
    );
  }
}
