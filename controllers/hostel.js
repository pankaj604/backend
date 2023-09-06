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
    const file2 = req.files.image2;
    await cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
      global.image = result.url;
    });
    await cloudinary.uploader.upload(
      file2.tempFilePath,
      async (err, result) => {
        global.image2 = result.url;
      }
    );

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
      hostelfor,
    } = req.body;
    const user = req.user;
    console.log(global.image);
    console.log(global.image2);
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
      image: global.image,
      image2: global.image2,
      user,
      hostelfor,
    });
    return res.status(200).json({
      success: true,
      massage: "Hostel added succesfully",
    });
  } catch (error) {
    next(error);
  }
};
// export const addhostel = async (req, res, next) => {
//   try {
//     const file = req.files.image;
//     cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
//       const image = result.url;

//     });
//   } catch (error) {
//     next(error);
//   }
// };
//
export const updatedatehostel = async (req, res, next) => {
  try {
    const { id, selectedDate, daysLeft } = req.body;
    const hostel = await Hostel.findById(id);

    hostel.date = selectedDate;
    hostel.days = daysLeft;
    hostel.save();

    res.status(200).json({
      success: true,
      massage: "date updated of hostel  ",
    });
  } catch (error) {
    next(error);
  }
};
//

//
export const myhostel = async (req, res, next) => {
  try {
    const id = req.user._id;
    const hostel = await Hostel.find({ user: id }).sort({ createdAt: -1 });
    const count = await Hostel.find({ status: true, user: id }).count();
    const coun = await Hostel.find({ status: false, user: id }).count();
    const total = await Hostel.find({ user: id }).count();
    res.status(200).json({
      success: true,
      massage: "your hostels",
      hostel,
      count,
      coun,
      total,
    });
  } catch (error) {
    next(error);
  }
};
export const allhostel = async (req, res, next) => {
  try {
    if (req.user._id.toString() === "6491ac566c31a2149a105a9c") {
      const hostel = await Hostel.find({}).sort({ createdAt: -1 });
      const count = await Hostel.find({ isApproved: true }).countDocuments();
      const coun = await Hostel.find({ isApproved: false }).countDocuments();
      const total = await Hostel.find({}).count();
      res.status(200).json({
        success: true,
        massage: "all rooms received",
        hostel,
        count,
        coun,
        total,
      });
    }
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
    const { city, id } = req.body;

    const hostels = await Hostel.find({
      status: true,
      isApproved : true,
      city: city,
      hostelfor: id,
    }).sort({ createdAt: -1 });

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
export const hostelaprovel = async (req, res, next) => {
  try {
    if (req.user._id.toString() === "6491ac566c31a2149a105a9c") {
      const { id } = req.params;
      const hostel = await Hostel.findById(id);

      hostel.isApproved = !hostel.isApproved;
      hostel.save();

      res.status(200).json({
        success: true,
        massage: "hostel updated",
      });
    }
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
