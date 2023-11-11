import PricingModel from "../models/PricingModel.js";
import mongoose from "mongoose";
import { RazorPayInstance } from '../server.js'
export const checkout = async (req, res) => {
    try {
        const documentId = new mongoose.Types.ObjectId(req.body.id); 
        const currentPrice = await PricingModel.findById({ _id: documentId });

        const checkoutOrder = {
            amount: currentPrice.pricing * 100,
            currency: "USD"
        }

        const order = await RazorPayInstance.orders.create(checkoutOrder)
        res.json(order)

    } catch (error) {
        console.log(error)
        res.json({"error":"sadasdas"})
    }
}