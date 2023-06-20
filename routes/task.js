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
} from "../controllers/task.js";

const taskrouter = express.Router();

taskrouter.get("/boys", isAuthenticated, boys);
taskrouter.get("/girls", isAuthenticated, girls);
taskrouter.get("/pg", isAuthenticated, pg);
taskrouter.get("/hostles", isAuthenticated, hostles);
taskrouter.get("/all", isAuthenticated, all);
taskrouter.post("/add", add);
taskrouter.put("/update/:id", isAuthenticated, update);
taskrouter.delete("/delet/:id", isAuthenticated, delet);
taskrouter.get("/myrooms", isAuthenticated, mydata);

export default taskrouter;
