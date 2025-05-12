// models/Customer.ts
import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  customer_id: String,
  first_name: String,
  last_name: String,
  email: String,
  phone: String,
  city: String,
  total_spend: Number,
  last_order_date: Date,
  created_by: String, // For your dummy user
});

export default mongoose.models.Customer || mongoose.model("Customer", customerSchema);
