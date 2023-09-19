import { Router } from "express";
import multer from "multer";
import Boom from "@hapi/boom";
import HttpStatusCodes from "http-status-codes";
import applyFiltersHandler from "./applyFiltersHandler.mjs";

const router = Router();

router.get("/",(req,res)=>{
    res.send("ok images GET");
})

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/",upload.single("images"),applyFiltersHandler);

export default router;
