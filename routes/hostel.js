import express from "express";
import { isAuthenticated } from "../utils/auth.js";
import { addhostel, allhostel, hostelaprovel, hosteldelete, hostels, hostelupdate, myhostel, updateseat } from "../controllers/hostel.js";


const hostelrouter = express.Router();

hostelrouter.post("/add",isAuthenticated,addhostel)
hostelrouter.get("/myhostel",isAuthenticated,myhostel)
hostelrouter.get("/all",allhostel)
hostelrouter.put("/update/:id",isAuthenticated,hostelupdate)
hostelrouter.put("/approveHostel/:id",hostelaprovel)
hostelrouter.delete("/delete/:id",isAuthenticated,hosteldelete)
hostelrouter.get("/hostels/:city",hostels)

hostelrouter.put("/updateseat/:id",isAuthenticated,updateseat)

  


export default hostelrouter;