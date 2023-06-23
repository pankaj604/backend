import express from "express";

import { isAuthenticated } from "../utils/auth.js";

import {
  getallusers,
  regester,
  login,
  logout,
  mydetails,
  forget,
  reset,
} from "../controllers/user.js";
const router = express.Router();

router.post("/regester", regester);

router.post("/login", login);

router.get("/logout", logout);

router.get("/all", getallusers);

router.get("/me", isAuthenticated, mydetails);
router.post("/forget", forget);
router.post("/reset", reset);

export default router;
