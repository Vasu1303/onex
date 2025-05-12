import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  order_id: String,
  customer_id: String,     
  product: String,
  quantity:Number,

  amount: Number,
  category: String,
  address:String,
  city:String,
  country:String,
  

  order_date: Date,
  created_by: String,       
});

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
