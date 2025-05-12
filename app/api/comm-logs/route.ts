    import { NextRequest, NextResponse } from "next/server";
    import { connectDB } from "@/lib/db";
    import CommunicationLog from "@/models/CommunicationLogs";

    export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
       
        console.log("🧾 Incoming log data:", body); 
        const {
        campaign_id,
        customer_id,
        customer_email,
        message,
        status,
        } = body;

        await connectDB();

        const log = await CommunicationLog.create({
        campaign_id,
        customer_id,
        customer_email,
        message,
        status,
        });

        return NextResponse.json({ message: "Log saved", log });
    } catch (err) {
        console.error("Error saving log:", err);
        return NextResponse.json(
        { error: "Failed to save log" },
        { status: 500 }
        );
    }
    }
