import { BadRequestError } from "../errors/customErros.js";
import PricingModel from "../models/PricingModel.js"
import mongoose from "mongoose";
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
        const docID_isValid = mongoose.Types.ObjectId.isValid(documentId)
        if(!docID_isValid) 
             throw new BadRequestError("Provided docID is not valid !") 
        const result = await PricingModel.findById({ _id: documentId });
        res.json(result)
    }
    catch (error) {
        res.json(error)
    }
}

