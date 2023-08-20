import express from "express";

import { isAuthenticated } from "../utils/auth.js";
import { addshop,  allshop,  myshop,  shopaprovel,  shops,  shopupdate, sopdelet, updatedateshop } from "../controllers/shop.js";
const shoprouter = express.Router();

shoprouter.get("/my",isAuthenticated, myshop);
shoprouter.post("/addshop", isAuthenticated, addshop);
shoprouter.get("/all",isAuthenticated, allshop);
shoprouter.post("/updatedate", isAuthenticated, updatedateshop);
shoprouter.put("/update/:id",isAuthenticated, shopupdate);
shoprouter.put("/approveShop/:id",isAuthenticated, shopaprovel);
shoprouter.delete("/delet/:id",isAuthenticated, sopdelet);
shoprouter.get("/:city", shops);




export default shoprouter;