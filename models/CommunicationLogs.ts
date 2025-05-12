import mongoose from "mongoose";

const communicationLogSchema = new mongoose.Schema({
  campaign_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Campaign",
    required: true,
  },
  customer_id: {
    type: String,
    required: true,
  },
  customer_email: String,
  message: String,
  status: {
    type: String,
    enum: ["SENT", "FAILED"],
    required: true,
  },
  delivery_time: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.CommunicationLog || mongoose.model("CommunicationLog", communicationLogSchema);
