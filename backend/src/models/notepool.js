import mongoose from "mongoose";
// NOTEPOOL
const notepoolSchema = new mongoose.Schema(
{
    email : { 
        "type" : String,
        "required" : true,
    },

    notepool : {
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

const Notepool = mongoose.model("Notepool",notepoolSchema);
export { Notepool };