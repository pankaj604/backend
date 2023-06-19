import { Room } from "../models/task.js";
import { isAuthenticated } from "../utils/auth.js";
import ErrorHandler from "../utils/error.js";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
export const boys = async (req, res, next) => {
  try {
    const rooms = await Room.find({ forr: "boys", status: true });
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
    const rooms = await Room.find({ forr: "girls", status: true });
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
    const rooms = await Room.find({ forr: "pg", status: true });
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
    const rooms = await Room.find({ forr: "hostles", status: true });
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
export const add = async (req, res, next) => {
  try {
    const { city, rent, forr, address, mobile } = req.body;
    //
    const imageUrl = req.file.path

    //
    const room = await Room.create({
      city,
      rent,
      forr,
      address,
      mobile,
      user: req.user,
      imageUrl
    });

    return res.status(200).json({
      success: true,
      massage: "room added succesfully",
    });
  } catch (error) {
    next(error);
  }
};

export const all = async (req, res, next) => {
  try {
    const rooms = await Room.find({});
    res.status(200).json({
      success: true,
      massage: "room updated",
      rooms,
    });
  } catch (error) {
    next(error);
  }
};

export const delet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const room = await Room.findById(id);

    await room.deleteOne();
    console.log(room);
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

export const mydata = async (req, res, next) => {
  try {
    const id = req.user._id;
    const room = await Room.find({ user: id });

    res.status(200).json({
      success: true,
      massage: "your rooms",
      room,
    });
  } catch (error) {
    next(error);
  }
};
