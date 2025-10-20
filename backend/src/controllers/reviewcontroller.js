import { Review } from "../models/review.js"


export async function review(req, res) {
    try {
        const { name, content } = req.body;

        // Create and save new pool
        const newReview = new Review({ name, content });
        const savedReview = await newReview.save();

        return res.status(200).json({ message: "REVIEW SUBMITTED SUCCESSFULLY", savedReview }); // 201 Created
    } catch (error) {
        console.error("ERROR IN REVIEW CONTROLLER:", error);
        res.status(500).json({ message: "SERVER ERROR" });
    }
}