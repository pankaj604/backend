import express from "express";
import { isAuthenticated } from "../utils/auth.js";

import {
  boys,
  girls,
  pg,
  hostles,
  all,
  add,
  delet,
  update,
  mydata,
} from "../controllers/task.js";
import multer from "multer";
const taskrouter = express.Router();

//

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });
 
//
taskrouter.get("/boys", isAuthenticated, boys);
taskrouter.get("/girls", isAuthenticated, girls);
taskrouter.get("/pg", isAuthenticated, pg);
taskrouter.get("/hostles", isAuthenticated, hostles);
taskrouter.get("/all", isAuthenticated, all);
taskrouter.post("/add", isAuthenticated,upload.single('image'), add);
taskrouter.put("/update/:id", isAuthenticated, update);
taskrouter.delete("/delet/:id", isAuthenticated, delet);
taskrouter.get("/myrooms", isAuthenticated, mydata);

export default taskrouter;
