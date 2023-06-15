import mongoose from "mongoose";
export const connectdb = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "backend",
    })
    .then(() => console.log("Database Connected"))
    .catch((e) => console.log(e));
};
