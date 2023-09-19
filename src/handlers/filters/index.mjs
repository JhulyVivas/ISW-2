import {Router} from "express";
import applyFiltersHandler from "./applyFiltersHandler.mjs";
import multer from "multer";

const router = Router();
router.get("/",(req,res)=>{
    res.send("ok images GET");
})
const storage = multer.memoryStorage();
const upload = multer({storage})
router.post("/",upload.single("files"),applyFiltersHandler);

export default router;
