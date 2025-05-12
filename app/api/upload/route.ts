import { connectDB } from "@/lib/db";
import Customer from "@/models/Customer";
import Order from "@/models/Orders";

import { NextRequest, NextResponse } from "next/server";
import Papa from "papaparse";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const customerFile = formData.get("customerFile") as File;
  const orderFile = formData.get("orderFile") as File;

  if (!customerFile || !orderFile) {
    return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
  }

  await connectDB();

  // Parse customer file
  const customerBuffer = Buffer.from(await customerFile.arrayBuffer());
  const customerCsv = customerBuffer.toString("utf-8");

  const customerResult = Papa.parse(customerCsv, {
    header: true,
    skipEmptyLines: true,
  });

  // Parse order file
  const orderBuffer = Buffer.from(await orderFile.arrayBuffer());
  const orderCsv = orderBuffer.toString("utf-8");

  const orderResult = Papa.parse(orderCsv, {
    header: true,
    skipEmptyLines: true,
  });

  try {
    await Customer.insertMany(
      customerResult.data.map((c: any) => ({
        customer_id: c.customer_id?.toString(),
        first_name: c.first_name?.toString(),
        last_name: c.last_name?.toString(),
        email: c.email?.toString(),
        phone: c.phone?.toString(),
        city: c.city?.toString(),
        total_spend: parseFloat(c.total_spend) || 0,
        last_order_date: c.last_order_date ? new Date(c.last_order_date) : null,

        created_by: "dummy_user_1",
      }))
    );

    await Order.insertMany(
      orderResult.data.map((o: any) => ({
        order_id: o.order_id?.toString(),
        customer_id: o.customer_id?.toString(),
        product: o.product_name?.toString(),
        quantity: o.quantity,
        amount: o.total_price,
        category: o.category?.toString(),
        address: o.shipping_address?.toString(),
        city: o.city?.toString(),
        country: o.country?.toString(),

        order_date: o.order_date ? new Date(o.order_date) : null,

        created_by: "dummy_user_1",
      }))
    );

    return NextResponse.json({
      Customermessage: "Customer data saved to DB ✅",
      Ordermessage: "Order data saved to DB ✅",
    });
  } catch (err) {
    console.error("DB Insert Error:", err);
    return NextResponse.json({ message: "DB Insert Failed" }, { status: 500 });
  }
}

export async function GET() {
  await connectDB();
  const customers = await Customer.find({ created_by: "dummy_user_1" }).limit(
    10
  );
  return NextResponse.json(customers);
}
