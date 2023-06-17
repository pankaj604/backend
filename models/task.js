import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  city: "string",
  rent: "string",
  forr: "string",
  address: "string",
  mobile: "string",
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  status: {
    type: Boolean,
    default: true,
  },
});

export const Room = mongoose.model("Room", roomSchema);
