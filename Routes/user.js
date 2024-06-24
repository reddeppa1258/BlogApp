import  express from "express"
import { deleteuser, getallusers, getsingleuser, updateuser } from "../controller/userController.js";
import { authnticate, restrict } from "../auth/verifytoken.js";



const router = express.Router();

router.get("/allusers",authnticate,restrict(["user"]) ,getallusers)
router.delete("/delete/:id",deleteuser)
router.get("/profile/me",authnticate,getsingleuser)
router.put("/update/:id",authnticate,updateuser)

export default router;