import PricingModel from "../models/PricingModel.js"

export const getAllPlans = async (req, res) => {
    try {
        const pricingData = await PricingModel.find();
        res.json(pricingData);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
