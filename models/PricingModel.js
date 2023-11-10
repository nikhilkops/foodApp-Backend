 import mongoose from "mongoose";

const pricingSchema = new mongoose.Schema({
  planType: { type: String, required: true },
  isComplete: { type: String, required: true },
  pricing: { type: Number, required: true },
  permonth: { type: Number, required: true },
  featuresGreen: { type: [String], required: true },
  featuresRed: { type: [String], required: true }
});

const PricingModel = mongoose.model('PricingModel', pricingSchema);

export default PricingModel
