import express from "express";

import { isAuthenticated } from "../utils/auth.js";
import { addshop,  myshop,  shops,  shopupdate, sopdelet } from "../controllers/shop.js";
const shoprouter = express.Router();
shoprouter.get("/my",isAuthenticated, myshop);
shoprouter.post("/addshop", isAuthenticated, addshop);
shoprouter.put("/update/:id",isAuthenticated, shopupdate);
shoprouter.delete("/delet/:id",isAuthenticated, sopdelet);
shoprouter.get("/:city", shops);



export default shoprouter;