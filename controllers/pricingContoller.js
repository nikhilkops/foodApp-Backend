import PricingModel from "../models/PricingModel.js"

export const getAllPlans = async (req, res) => {
    try {
        const pricingData = await PricingModel.find();
        res.json(pricingData);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getSinglePlan = async (req, res) => {
    try {
        const documentId = req.params.id; 
        const result = await PricingModel.findById({ _id: documentId });
        res.json(result)
    }
    catch (error) {
        res.json(error)
    }
}

