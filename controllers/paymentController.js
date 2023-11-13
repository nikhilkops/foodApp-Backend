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
        // pricing: 9999,
        // planType: 'Starter',

        const selectedPlan = {
            planType:currentPrice.planType,
            price:currentPrice.pricing
        } 
        const order = await RazorPayInstance.orders.create(checkoutOrder)
        order.cPlan = selectedPlan;

        res.json(order)

    } catch (error) {
        console.log(error)
        res.json({ "error": error.message })
    }
}

export const paymentVerification = async (req, res) => {
 
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
        .update(body.toString())
        .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;
   
    if (isAuthentic) {
        //storein database
        let VerificationRedirectURL = `https://foodapp-react-sctz.onrender.com/sucessfull?reference=${razorpay_payment_id}`
        if(process.env.NODE_ENV==='development') VerificationRedirectURL=`http://localhost:3000/sucessfull?reference=${razorpay_payment_id}`
        res.redirect(VerificationRedirectURL) 
    }
}

export const getKey = (req, res) => {  
    res.json({ key: process.env.RAZORPAY_API_KEY })
}