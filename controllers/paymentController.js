import * as dotenv from "dotenv";
dotenv.config();
import crypto from 'crypto'
import PricingModel from "../models/PricingModel.js";
import mongoose from "mongoose";
import { RazorPayInstance } from '../server.js'

export const checkout = async (req, res) => {
    try { 
        const documentId = new mongoose.Types.ObjectId(req.params.id);
        const currentPrice = await PricingModel.findById(documentId);
        const price = (Number)(currentPrice.pricing) * 100;
        const checkoutOrder = {
            amount: price,
            currency: "INR"
        }
        const order = await RazorPayInstance.orders.create(checkoutOrder)
        res.json(order)

    } catch (error) {
        console.log(error)
        res.json({ "error": error.message })
    }
}
 
export const paymentVerification = async (req, res) => {
    console.log(req.body)
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    // const expectedSignature = crypto
    // .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
    // .update(body.toString())
    // .digest("hex");

    // const isAuthentic = expectedSignature === razorpay_signature;
    // console.log("Verification")
    // if(isAuthentic)
    // {
    //     //storein database
    //     res.redirect('')
    // }
    res.status(200).json({success:true})
}

export const getKey = (req,res)=>{
    // console.log("get Key")
    res.json({key:process.env.RAZORPAY_API_KEY})
}