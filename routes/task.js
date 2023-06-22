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
} from "../controllers/task.js";

const taskrouter = express.Router();

taskrouter.get("/boys", boys);
taskrouter.get("/girls", girls);
taskrouter.get("/pg", pg);
taskrouter.get("/everyone", everyone);
taskrouter.get("/hostles", hostles);
taskrouter.get("/all", isAuthenticated, all);
taskrouter.post("/add",isAuthenticated, add);
taskrouter.put("/update/:id", isAuthenticated, update);
taskrouter.delete("/delet/:id", isAuthenticated, delet);
taskrouter.get("/myrooms", isAuthenticated, mydata);

export default taskrouter;
