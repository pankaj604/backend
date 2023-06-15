import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  city: "string",
  rent: "string",
  forr: "string",
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  switch: {
    type: Boolean,
    default: true,
  },
   
});

export const Room = mongoose.model("Room", roomSchema);
