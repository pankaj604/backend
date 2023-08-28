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
  hostelfor : "string",
  date:"string",
  days:"string",

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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Hostel = mongoose.model("Hostel", HostelSchema);
