import {Note} from "../models/note.js"; //LOGIN
import dotenv from "dotenv";

dotenv.config();


export async function getnote(req, res)  {
    try {
        const email = req.user && req.user.email ? req.user.email : null;
        const notes = await Note.find({ email }).sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        console.error("ERROR IN GETNOTE CONTROLLER",error);
        res.status(500).json({message : "SERVER ERROR"});
    }
}

export async function getallnote(req, res) {
  try {
    const notepool = req.user?.notepool;

    if (!notepool) {
      return res.status(400).json({ message: "Notepool not specified in token" });
    }

    const notes = await Note.find({ notepool }).sort({ createdAt: -1 });

    res.status(200).json(notes);
  } catch (error) {
    console.error("ERROR IN GETALL NOTE CONTROLLER", error);
    res.status(500).json({ message: "SERVER ERROR" });
  }
}

export async function getonenote(req, res)   {
    try {
        const onenote = await Note.findById(req.params.id);
        if(!onenote)
            return res.status(404).json({message : "NOT FOUND"});
        res.status(200).json(onenote);
    } catch (error) {
        console.error("ERROR IN GETONENOTE CONTROLLER",error);
        res.status(500).json({message : "SERVER ERROR"});
    }
}

export async function postnote(req, res)  {
    try {
        const showallnote = req.headers['x-showallnote'] === "true";
        const { title, content } = req.body;
        // req.user may be the payload object, or { email: ... } if set by jwt.verify
        const email = req.user && req.user.email ? req.user.email : null;
        if (!email) {
            return res.status(401).json({ message: "UNAUTHORIZED: NO EMAIL IN TOKEN" });
        }
        const notepool = req.user && req.user.notepool && showallnote ? req.user.notepool : null;
        const note = new Note({ email, notepool, title, content });
        console.log("NEW NOTE", note);
        const savednote = await note.save();
        res.status(201).json(savednote);
    } catch (error) {
        console.error("ERROR IN POSTNOTE CONTROLLER", error);
        res.status(500).json({ message: "SERVER ERROR" });
    }
}

export async function putnote(req, res)   {
    try {
        const {title, content} = req.body;
        const putnote = await Note.findByIdAndUpdate(req.params.id,{title,content},{new:true,});

        if(!putnote)
            return res.status(404).json({message : "NOTE NOT FOUND"});

        res.status(200).json(putnote)

    } catch (error) {
        console.error("ERROR IN PUTNOTE CONTROLLER",error);
        res.status(500).json({message : "SERVER ERROR"});
    }
    
}

export async function delnote(req, res)   {
    try {
        const delnote = await Note.findByIdAndDelete(req.params.id);

        if(!delnote)
           return res.status(404).json({message : "NOT FOUND"});

        res.status(200).json({message : "NOTE DELETED"});

    } catch (error) {
        console.error("ERROR IN DELNOTE CONTROLLER",error);
        res.status(500).json({message : "SERVER ERROR"});
    }
}