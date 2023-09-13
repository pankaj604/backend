import express from "express";
import cookieParser from "cookie-parser";
import router from "./routes/user.js";
import { config } from "dotenv";
import taskrouter from "./routes/task.js";
import { errorMiddleware } from "./utils/error.js";
import shoprouter from "./routes/shop.js";
import fileUpload from "express-fileupload";
import cors from "cors";
import hostelrouter from "./routes/hostel.js";
import path from "path";
export const app = express();

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

config({
  path: "./data/config.env",
});

// app.use(
//   cors({
//     origin: ["https://wellroom.in"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );
//
const blockLocalhost = (req, res, next) => {
  if (req.headers.host && req.headers.host.startsWith('localhost')) {
    // Reject the request with a forbidden (403) status code
    return res.status(403).json({ message: 'Access from localhost is not allowed.' });
  }
  next();
};

// Use the middleware to block localhost requests
app.use(blockLocalhost);
//

const allowedOrigins = ['https://wellroom.in'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());
app.use("/static", express.static("build/static"));
app.use("/v1/user", router);
app.use("/v1/room", taskrouter);
app.use("/v1/shop", shoprouter);
app.use("/v1/hostel", hostelrouter);

app.get("/", (req, res) => {
  res.sendFile(path.resolve("build", "index.html"));
});
app.get("/*", (req, res) => {
  res.sendFile(path.resolve("build", "index.html"));
});
app.use(errorMiddleware);
//

// app.set("view engine", "ejs");
