import { Creden } from "../models/creden.js"; //REGISTER
import { Notepool } from "../models/notepool.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";



dotenv.config();

// LOGIN
export async function login(req, res) {
    try {
        const { email, notepool } = req.body;;
        const user = await Creden.findOne({email});
        console.log(user)

        if(!user){
            return res.status(404).json({ message: "USER NOT FOUND"});
        } 
        if (user && !await bcrypt.compare(req.body.password, user.password)) {
            return res.status(401).json({ message: "WRONG PASSWORD"});
        }
        if(notepool && !user.notepool.includes(notepool)) {
            return res.status(405).json({message:"NOT REGISTERED ON POOL"})
        }
        if(user && await bcrypt.compare(req.body.password, user.password)) {
            const token = jwt.sign({ email: user.email, notepool}, process.env.JWT_SECRET);
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
               return res.status(201).json({ message: "USER ALREADY EXISTS", user: existingUser });

             // 409 Conflict
        }

        // Create and save new user
        const newUser = new Creden({ name, notepool:"", email, password });
        const savedUser = await newUser.save();

        return res.status(200).json({ message: "USER REGISTERED SUCCESSFULLY", user: savedUser }); // 201 Created
    
    } catch (error) {
        console.error("ERROR IN REGISTER CONTROLLER:", error);
        res.status(500).json({ message: "SERVER ERROR" });
    }
}

