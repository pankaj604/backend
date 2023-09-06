import { Shop } from "../models/shop.js";

import ErrorHandler from "../utils/error.js";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: "dvgumv3vu",
  api_key: "687748563923649",
  api_secret: "yze_m6R_Pwk_5wvBWROr_TaaxTw",
});
export const shopupdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const shop = await Shop.findById(id);

    shop.status = !shop.status;
    shop.save();

    res.status(200).json({
      success: true,
      massage: "Shop updated",
      shop,
    });
  } catch (error) {
    next(error);
  }
};
//

export const updatedateshop = async (req, res, next) => {
  try {
    const { id, selectedDate, daysLeft } = req.body;
    const shop = await Shop.findById(id);

    shop.date = selectedDate;
    shop.days = daysLeft;
    shop.save();

    res.status(200).json({
      success: true,
      massage: "date updated for shop ",
    });
  } catch (error) {
    next(error);
  }
};

//
export const shopaprovel = async (req, res, next) => {
  try {
    if (req.user._id.toString() === "6491ac566c31a2149a105a9c") {
      const { id } = req.params;
      const shop = await Shop.findById(id);

      shop.isApproved = !shop.isApproved;
      shop.save();

      res.status(200).json({
        success: true,
        massage: "room updated",
        shop,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const sopdelet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const shop = await Shop.findById(id);

    await shop.deleteOne();

    res.status(200).json({
      success: true,
      massage: "shop deleted",
    });
  } catch (error) {
    next(error);
  }
};
//

export const addshop = async (req, res, next) => {
  try {
    const file = req.files.image;
    const file2 = req.files.image2;
    await cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
      const image = result.url;
      global.image = result.url;
    });
    await cloudinary.uploader.upload(
      file2.tempFilePath,
      async (err, result) => {
        const image = result.url;
        global.image2 = result.url;
      }
    );

    const { city, size, area, nearby, rent, mobile, address } = req.body;
    const user = req.user;
    const room = await Shop.create({
      city,
      size,
      area,
      nearby,
      rent,
      mobile,
      address,
      image: global.image,
      image2: global.image2,
      user,
    });
    return res.status(200).json({
      success: true,
      massage: "Shop added succesfully",
    });
  } catch (error) {
    next(error);
  }
};

//

export const allshop = async (req, res, next) => {
  try {
    if (req.user._id.toString() === "6491ac566c31a2149a105a9c") {
      const shop = await Shop.find({}).sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        massage: "all shop received",
        shop,
      });
    }
  } catch (error) {
    next(error);
  }
};
export const myshop = async (req, res, next) => {
  try {
    const id = req.user._id;
    const shop = await Shop.find({ user: id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      massage: "your shops",
      shop,
    });
  } catch (error) {
    next(error);
  }
};

export const shops = async (req, res, next) => {
  try {
    const { city } = req.params;
    const shops = await Shop.find({
      status: true,
      isApproved : true,
      city: city,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      shops,
    });
  } catch (error) {
    next(error);
  }
};
