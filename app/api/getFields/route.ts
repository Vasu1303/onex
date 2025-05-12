import { NextResponse }  from "next/server";
import { connectDB } from "@/lib/db";

import Customer from "@/models/Customer";


export async function GET(){
    await connectDB();
    const fields = Object.keys(Customer.schema.paths).filter((field)=>!['_id', '__v', 'created_by', 'createdAt', 'updatedAt'].includes(field));
    
    
    return NextResponse.json(fields);
}