import express from "express";
import cookieParser from "cookie-parser";
import router from "./routes/user.js";
import { config } from "dotenv";
import taskrouter from "./routes/task.js";
import { errorMiddleware } from "./utils/error.js";
import cors from "cors"
 export const app = express();
config({
  path: "./data/config.env",
});


app.use(cors({
  origin :[process.env.FRONTENDURL],
  methods:["GET","POST","PUT","DELETE"],
  credentials:true
}))
app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'))
app.use("/v1/user", router);
app.use("/v1/room", taskrouter);
app.get("/",(req,res)=>{
  res.json({
    success : true,
    massage :  "hello pankaj"
  })
})
app.use(errorMiddleware);
// app.set("view engine", "ejs");

