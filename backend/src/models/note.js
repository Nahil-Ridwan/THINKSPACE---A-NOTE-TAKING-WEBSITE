import mongoose from "mongoose";
// 1 - CREATE A SCHEMA
const noteSchema = new mongoose.Schema(
{   email : {
        "type" : String,
        "required" : true,
    },
    title : { 
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

const Note = mongoose.model("Note",noteSchema);
export { Note };