import { Router } from "express";
import { checkout } from "../controllers/paymentController.js";
const router = Router();

router.route("/checkout").get( checkout )
router.route("/test").get( async(req,res)=>{
    res.json({msg:"sdnkfnsfk"})
} )
 
 
export default router;
