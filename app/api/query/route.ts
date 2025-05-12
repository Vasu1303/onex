import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Customer from "@/models/Customer";

interface Rule {
  field: string;
  operator: "equals" | "contains" | ">" | "<" | ">=" | "<=";
  value: string;
}
export async function POST(request: Request) {
  try {
    const { rules, combinator } :{rules: Rule[]; combinator: "AND" | "OR"} = await request.json();

    await connectDB();

    // Convert rules to MongoDB query
    const mongoQuery = rules.map((rule: Rule) => {
      const { field, operator, value } = rule;
      
      switch (operator) {
        case "equals":
          return { [field]: value };
        case "contains":
          return { [field]: { $regex: value, $options: 'i' } };
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

    const query = combinator === "AND" 
      ? { $and: mongoQuery }
      : { $or: mongoQuery };

    // Execute query and count matches
    const matchCount = await Customer.countDocuments(query);
    
    return NextResponse.json({
        
      matchCount,
      query: query // For debugging
    });

  } catch (error) {
    console.error("Query error:", error);
    return NextResponse.json(
      { error: "Failed to process query" },
      { status: 500 }
    );
  }
}