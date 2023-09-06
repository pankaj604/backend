import express from "express";

import { isAuthenticated, logstatus } from "../utils/auth.js";

import {
  getallusers,
  regester,
  login,
  logout,
  mydetails,
  forget,
  reset,
  alluser
} from "../controllers/user.js";
const router = express.Router();

router.post("/regester", regester);

router.post("/login", login);

router.get("/logout", logout);

router.get("/all", getallusers);
router.post("/userdata",isAuthenticated , alluser);

router.get("/me", isAuthenticated, mydetails);
router.get("/check", logstatus);
router.post("/forget", forget);
router.post("/reset", reset);

export default router;
