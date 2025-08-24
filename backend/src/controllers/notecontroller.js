import {Note} from "../models/note.js"; //LOGIN
import {Creden} from "../models/creden.js"; //REGISTER
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// LOGIN
export async function login(req, res) {
    try {
        const email = req.body.email;
        const user = await Creden.findOne({email});

        if(!user){
            return res.status(404).json({ message: "USER NOT FOUND"});
        } else if (user && !await bcrypt.compare(req.body.password, user.password)) {
            return res.status(401).json({ message: "WRONG PASSWORD"});
        }
        else if(user && await bcrypt.compare(req.body.password, user.password)) {
            const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
            return res.status(200).json({ token, message: "LOGIN SUCCESSFUL" });

        }
    }catch (error) {
        console.error("ERROR IN LOGIN CONTROLLER", error);
        res.status(500).json({ message: "SERVER ERROR" });
    }
}


export async function register(req, res) {
    try {
        const { name, email } = req.body;
        const password = await bcrypt.hash(req.body.password, 10);
        // Check if user already exists
        const existingUser = await Creden.findOne({ email });
        console.log("EXISTING USER",existingUser);
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
             // 409 Conflict
        }

        // Create and save new user
        const newUser = new Creden({ name, email, password });
        const savedUser = await newUser.save();

        return res.status(201).json({ message: "User registered successfully", user: savedUser }); // 201 Created
    } catch (error) {
        console.error("Error in register controller:", error);
        res.status(500).json({ message: "Server error" });
    }
}


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
        const { title, content } = req.body;
        // req.user may be the payload object, or { email: ... } if set by jwt.verify
        const email = req.user && req.user.email ? req.user.email : null;
        if (!email) {
            return res.status(401).json({ message: "UNAUTHORIZED: NO EMAIL IN TOKEN" });
        }
        const note = new Note({ email, title, content });
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