import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
  city: "string",
  rent: "string",
  address: "string",
  mobile: "string",
  area: "string",
  nearby: "string",
  date : "string",
  days : "string",
  

  size: "string",
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: Boolean,
    default: false,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  image: "string",
  image2: "string",
  shopid : "string",
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Shop = mongoose.model("Shop", shopSchema);
