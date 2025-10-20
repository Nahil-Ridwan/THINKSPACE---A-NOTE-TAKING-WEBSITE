import mongoose from "mongoose";
// 1 - CREATE A SCHEMA
const reviewSchema = new mongoose.Schema(
{   name : {
        "type" : String,
        "required" : true,
    },
    content : {
        "type" : String,
        "required" : true,
    },
},

{timestamps : true} // CREATED AND UPSATED
);


// 2 - MODEL BASED ON THAT SCHEMA

const Review = mongoose.model("Review",reviewSchema);
export { Review };