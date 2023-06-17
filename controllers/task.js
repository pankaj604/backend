import { Room } from "../models/task.js";
import { isAuthenticated } from "../utils/auth.js";

import jwt from "jsonwebtoken";




export const boys = async (req, res, next) => {
  try {
    const rooms = await Room.find({ forr: "boys" });
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
    const rooms = await Room.find({ forr: "girls" });
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
    const rooms = await Room.find({ forr: "pg", switch: true });
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
    const rooms = await Room.find({ forr: "hostles" });
    res.status(200).json({
      success: true,
      rooms,
    });
  } catch (error) {
    next(error);
  }
};

export const add = async (req, res, next) => {
  try {
    const { city, rent, forr, address,mobile } = req.body;
    const room = await Room.create({
      city,
      rent,
      forr,
      address,
      mobile,
      user: req.user,
    
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
    room.deleteOne();
    res.status(200).json({
      success: true,
      massage: "room deleted",
      room,
    });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res,next) => {
  try {
    const { id } = req.params;
    const room = await Room.findById(id);
    room.switch = !room.switch;
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
