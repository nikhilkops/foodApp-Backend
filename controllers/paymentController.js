import PricingModel from "../models/PricingModel.js";
import mongoose from "mongoose";
import { RazorPayInstance } from '../server.js'
export const checkout = async (req, res) => {
    try {
        console.log(req.body)
        const documentId = new mongoose.Types.ObjectId(req.body.id);
        const currentPrice = await PricingModel.findById(documentId);
        const price = (Number)(currentPrice.pricing) * 100;
        const checkoutOrder = {
            amount: price,
            currency: "USD"
        }
        const order = await RazorPayInstance.orders.create(checkoutOrder)
        res.json(order)

    } catch (error) {
        console.log(error)
        res.json({ "error": error.message })
    }
}

