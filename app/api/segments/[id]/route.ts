import { connectDB } from "@/lib/db";
import Segment from "@/models/Segment";
import Customer from "@/models/Customer";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();

    const segmentId = params.id;

    // ✅ 1. Fetch the segment by ID
    const segment = await Segment.findById(segmentId);

    if (!segment) {
      return NextResponse.json({ error: "Segment not found" }, { status: 404 });
    }

    // ✅ 2. Build MongoDB query from rules
    const rules = segment.rules;
    const combinator = segment.combinator;

    const mongoQuery = rules.map((rule: any) => {
      const { field, operator, value } = rule;

      switch (operator) {
        case "equals":
          return { [field]: value };
        case "contains":
          return { [field]: { $regex: value, $options: "i" } };
        case ">":
          return { [field]: { $gt: parseFloat(value) } };
        case "<":
          return { [field]: { $lt: parseFloat(value) } };
        case ">=":
          return { [field]: { $gte: parseFloat(value) } };
        case "<=":
          return { [field]: { $lte: parseFloat(value) } };
        default:
          return {};
      }
    });

    const finalQuery = combinator === "AND" ? { $and: mongoQuery } : { $or: mongoQuery };

    // ✅ 3. Fetch matched customers
    const customers = await Customer.find(finalQuery).limit(100); // you can paginate later

    return NextResponse.json({
      segment,
      customers,
    });
  } catch (err) {
    console.error("Error in segment detail:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
