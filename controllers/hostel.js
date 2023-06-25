import { v2 as cloudinary } from "cloudinary";
import { Hostel } from "../models/hostel.js";
cloudinary.config({
  cloud_name: "dvgumv3vu",
  api_key: "687748563923649",
  api_secret: "yze_m6R_Pwk_5wvBWROr_TaaxTw",
});

export const addhostel = async (req, res, next) => {
  try {
    const file = req.files.image;
    cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
      const image = result.url;

      const {
        city,
        rent,
        address,
        mobile,
        area,
        nearby,
        availableseats,
        totalseats,
        gatetime,
        facilites,
      } = req.body;
      const user = req.user;

      const hostel = await Hostel.create({
        city,
        rent,
        address,
        mobile,
        area,
        nearby,
        availableseats,
        totalseats,
        gatetime,
        facilites,
        image,
        user,
      });
      return res.status(200).json({
        success: true,
        massage: "Hostel added succesfully",
      });
    });
  } catch (error) {
    next(error);
  }
};

//
export const myhostel = async (req, res, next) => {
  try {
    const id = req.user._id;
    const hostel = await Hostel.find({ user: id });

    res.status(200).json({
      success: true,
      massage: "your hostels",
      hostel,
    });
  } catch (error) {
    next(error);
  }
};
export const updateseat = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { seat } = req.body;
    const hostel = await Hostel.findById(id);

    hostel.availableseats = seat;
    hostel.save();

    res.status(200).json({
      success: true,
      massage: "hostel updated",
    });
  } catch (error) {
    next(error);
  }
};

export const hostels = async (req, res, next) => {
  try {
    const { city } = req.params;
    const hostels = await Hostel.find({
      status: true,
      city: city,
    });

    res.status(200).json({
      success: true,
      massage: " hostel get succesful",
      hostels,
    });
  } catch (error) {
    next(error);
  }
};

export const hostelupdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const hostel = await Hostel.findById(id);

    hostel.status = !hostel.status;
    hostel.save();

    res.status(200).json({
      success: true,
      massage: "hostel updated",
    });
  } catch (error) {
    next(error);
  }
};
export const hosteldelete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const hostel = await Hostel.findById(id);

    await hostel.deleteOne();

    res.status(200).json({
      success: true,
      massage: "hostel deleted",
    });
  } catch (error) {
    next(error);
  }
};
