import PricingModel from "../models/PricingModel.js";
import { RazorPayInstance } from '../server.js'
export const checkout = async (req, res) => {
    try {
        const documentId = req.body.id;
        const currentPrice = await PricingModel.findById({ _id: documentId });

        const checkoutOrder = {
            amount: currentPrice.pricing * 100,
            currency: "USD"
        }

        const order = await RazorPayInstance.orders.create(checkoutOrder)
        res.json(order)

    } catch (error) {
        res.json(error)
    }
}