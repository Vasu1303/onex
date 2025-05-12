
import mongoose from "mongoose";

const segmentSchema = new mongoose.Schema({
    segment_name: String,
    rules: Object,
    combinator: String,
    size: Number,
    created_by: String,
    created_at: {type: Date, default: Date.now}

})

export default mongoose.models.Segment || mongoose.model("Segment", segmentSchema)