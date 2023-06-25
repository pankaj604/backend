import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
  city: "string",
  rent: "string",
  address: "string",
  mobile: "string",
  area: "string",
  nearby: "string",

  size: "string",
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: Boolean,
    default: true,
  },
  image: "string",
});

export const Shop = mongoose.model("Shop", shopSchema);
