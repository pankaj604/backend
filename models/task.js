import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  city: "string",
  rent: "string",
  forr: "string",
  address: "string",
  mobile: "string",
  facilities: "string",
  size: "string",
  food: "string",
  date : "string",
  days : "string",

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
  roomid : "string",
  image2: "string",
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Room = mongoose.model("Room", roomSchema);
