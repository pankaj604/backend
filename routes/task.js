import express from "express";
import { isAuthenticated } from "../utils/auth.js";
import fileUpload from "express-fileupload";

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
  everyone,
  updateAproved,
  updatedate,
} from "../controllers/task.js";

const taskrouter = express.Router();

taskrouter.get("/boys/:city", boys);
taskrouter.get("/girls/:city", girls);
taskrouter.post("/pg", pg);

taskrouter.get("/everyone/:city", everyone);
taskrouter.get("/hostles/:city", hostles);
taskrouter.get("/all",isAuthenticated, all);
taskrouter.post("/add", isAuthenticated, add);
taskrouter.put("/update/:id", isAuthenticated, update);
taskrouter.post("/updatedate", isAuthenticated, updatedate);
taskrouter.put("/aprovedRoom/:id",isAuthenticated, updateAproved);
taskrouter.delete("/delet/:id", isAuthenticated, delet);
taskrouter.get("/myrooms", isAuthenticated, mydata);

export default taskrouter;
