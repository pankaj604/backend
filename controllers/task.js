import { Room } from "../models/task.js";
import { isAuthenticated } from "../utils/auth.js";
import ErrorHandler from "../utils/error.js";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import { Shop } from "../models/shop.js";
cloudinary.config({
  cloud_name: "dvgumv3vu",
  api_key: "687748563923649",
  api_secret: "yze_m6R_Pwk_5wvBWROr_TaaxTw",
});
export const add = async (req, res, next) => {
  try {
    const file = req.files.image;
    cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
      const image = result.url;

      const { city, rent, forr, address, mobile, facilities, size , food } = req.body;
 
      const user = req.user;
      const room = await Room.create({
        city,
        rent,
        forr,
        address,
        mobile,
        user,
        image,
        facilities,
        size,
        food
      });
      return res.status(200).json({
        success: true,
        massage: "room added succesfully",
      });
    });
  } catch (error) {
    next(error);
  }
};

export const boys = async (req, res, next) => {
  try {
    const { city } = req.params;

    const rooms = await Room.find({
      $or: [{ forr: "boys" }, { forr: "everyone" }],
      status: true,
      city: city,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      rooms,
    });
  } catch (error) {
    next(error);
  }
};

export const girls = async (req, res, next) => {
  try {
    const { city } = req.params;
    const rooms = await Room.find({
      $or: [{ forr: "girls" }, { forr: "everyone" }],
      status: true,
      city: city,
    }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      rooms,
    });
  } catch (error) {
    next(error);
  }
};
export const everyone = async (req, res, next) => {
  try {
    const { city } = req.params;
    const rooms = await Room.find({
      forr: "everyone",
      status: true,
      city: city,
    }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      rooms,
    });
  } catch (error) {
    next(error);
  }
};
export const pg = async (req, res, next) => {
  try {
    const { city, id } = req.body;

    const rooms = await Room.find({
      forr: id,
      status: true,
      city: city,
    }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      rooms,
    });
  } catch (error) {
    next(error);
  }
};
export const hostles = async (req, res, next) => {
  try {
    const { city } = req.params;
    const rooms = await Room.find({
      forr: "hostles",
      status: true,
      city: city,
    }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      rooms,
    });
  } catch (error) {
    next(error);
  }
};
// multer

// multer

export const all = async (req, res, next) => {
  try {
    if (req.user._id.toString() === "6491ac566c31a2149a105a9c") {
      const rooms = await Room.find({}).sort({ createdAt: -1 });
      const count = await Room.find({ isApproved: true }).countDocuments();
      const coun = await Room.find({ isApproved: false }).countDocuments();
      const total = await Room.find().count();

      res.status(200).json({
        success: true,
        massage: "all rooms received",
        rooms,
        count,
        coun,
        total,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const delet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const room = await Room.findById(id);
    const delImg = room.image;
    await room.deleteOne();

    await deleteImage(delImg);
    res.status(200).json({
      success: true,
      massage: "room deleted",
    });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const room = await Room.findById(id);

    room.status = !room.status;
    room.save();

    res.status(200).json({
      success: true,
      massage: "room updated",
      room,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAproved = async (req, res, next) => {
  try {
    const { id } = req.params;
    const room = await Room.findById(id);

    room.isApproved = !room.isApproved;
    room.save();

    res.status(200).json({
      success: true,
      massage: "room updated",
      room,
    });
  } catch (error) {
    next(error);
  }
};

export const mydata = async (req, res, next) => {
  try {
    const id = req.user._id;
    const room = await Room.find({ user: id }).sort({ createdAt: -1 });
    const count = await Room.find({ status: true, user: id }).count();
    const coun = await Room.find({ status: false, user: id }).count();
    const total = await Room.find({ user: id }).count();
    res.status(200).json({
      success: true,
      massage: "your rooms",
      room,
      count,
      coun,
      total,
    });
  } catch (error) {
    next(error);
  }
};

async function deleteImage(imageUrl) {
  try {
    const publicId = extractPublicId(imageUrl);

    const response = await cloudinary.uploader.destroy(publicId);

    // Handle successful deletion here
  } catch (error) {
    console.log("Error deleting image:", error);
    // Handle error here
  }
}

const extractPublicId = (imageUrl) => {
  const regex = /\/v\d+\/(.*?)\./;
  const match = imageUrl.match(regex);
  return match && match[1];
};
