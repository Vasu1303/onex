import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({
  segment_id: mongoose.Types.ObjectId,
  campaign_name:   String, 
  segment_name: String,
  message: String,
  sent_count: Number,
  failed_count: Number,
  created_by: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
});
campaignSchema.pre('save', function(next) {
  console.log('Saving campaign with name:', this.campaign_name);
  next();
});

export default mongoose.models.Campaign || mongoose.model("Campaign", campaignSchema);
