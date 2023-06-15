import express from "express";

import { isAuthenticated } from "../utils/auth.js";

import {
  getallusers,
  regester,
  login,
  logout,
  mydetails,
} from "../controllers/user.js";
const router = express.Router();

router.post("/regester", regester);

router.post("/login", login);

router.get("/logout", logout);

router.get("/all", getallusers);

router.get("/me", isAuthenticated, mydetails);

export default router;
