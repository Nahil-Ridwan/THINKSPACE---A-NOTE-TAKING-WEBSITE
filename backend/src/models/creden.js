import mongoose from "mongoose";
// CREDEN
const credenSchema = new mongoose.Schema(
{
    name : {
        "type" : String,
    },
    notepool : {
        "type" : String,
    },
    email : { 
        "type" : String,
        "required" : true,
    },
    password : {
        "type" : String,
        "required" : true,
    },
},

{timestamps : true} // CREATED AND UPSATED
);

const Creden = mongoose.model("Creden",credenSchema);
export { Creden };