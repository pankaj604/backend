import mongoose from "mongoose";

const HostelSchema = new mongoose.Schema({
  city: "string",
  rent: "string",
  address: "string",
  mobile: "string",
  area: "string",
  nearby: "string",
  availableseats: Number,
  totalseats: "string",
  gatetime: "string",
  facilites: "string",

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

export const Hostel = mongoose.model("Hostel", HostelSchema);
