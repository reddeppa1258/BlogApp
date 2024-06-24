import express from "express";
import { createnewblog, deleteblog, getallblogs, getblogbytopic, getsingleblog, updateblog } from "../controller/blogController.js";
import { authnticate } from "../auth/verifytoken.js";

const router = express.Router();

router.post("/createblog",authnticate,createnewblog)
router.get("/allblogs",getallblogs)
router.get("/singleblogs/:id",authnticate,getsingleblog)
router.delete("/deleteblog/:id",authnticate,deleteblog)
router.put("/updateblog/:id",authnticate,updateblog)
router.get("/getblogbytopic/:topic",getblogbytopic)


export default router;