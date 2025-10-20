import { Notepool } from "../models/notepool.js"; //POOL CREATION
import { Creden } from "../models/creden.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";



dotenv.config();


export async function createpool(req, res) {
    try {
        const { email, notepool } = req.body;
        const password = await bcrypt.hash(req.body.password, 10);
        // Check if user already exists
        const existingUser = await Creden.findOne({email});
        if(!existingUser)
        {
            return res.status(404).json({message:"USER NOT REGISTERED"});
        }
        const existingPool = await Notepool.findOne({ notepool });
        console.log("EXISTING POOL",existingPool);
        console.log("EXISTING USER",existingUser);
        if (existingPool) {
            return res.status(201).json({ message: "NOTEPOOL ALREADY EXIST",});
        }

        // Create and save new pool
        const newPool = new Notepool({ email, notepool,  password });
        const savedPool = await newPool.save();

        return res.status(200).json({ message: "POOL CREATED SUCCESSFULLY", user: savedPool }); // 201 Created
    } catch (error) {
        console.error("ERROR IN REGISTER CONTROLLER:", error);
        res.status(500).json({ message: "SERVER ERROR" });
    }
}

export async function joinpool(req, res) {
    try {
            const { email, notepool, } = req.body;
            // Check if user already exists
            const existingUser = await Creden.findOne({ email });
            const existingPool = await Notepool.findOne({ notepool })
            if(!existingPool)
            {
                return res.status(404).json({message: "POOL NOT FOUND"});
            }
            if(!existingUser)
            {
                return res.status(405).json({message: "USER NOT FOUND"});
            }
            console.log("EXISTING USER",existingUser);
            console.log("EXISTING POOL",existingPool);

            if (existingUser && existingPool && !(await bcrypt.compare(req.body.password, existingPool.password))) {
                        return res.status(403).json({ message: "WRONG PASSWORD"});
            }
            if (existingUser && existingPool && await bcrypt.compare(req.body.password, existingPool.password)) {
                if (!existingUser.notepool.includes(notepool) && existingPool) {
                   existingUser.notepool.push(notepool);
                   await existingUser.save();
                   return res.status(201).json({ message: "NOTEPOOL UPDATED FOR EXISTING USER", user: existingUser });
          } else {
            return res.status(202).json({ message: "USER ALREADY REGISTERED WITH THIS NOTEPOOL", user: existingUser });
          }
    
                 // 409 Conflict
            }
    
            // Create and save new user
            const newUser = new Creden({ name:existingUser.name, notepool:[notepool], email, password:existingUser.password });
            const savedUser = await newUser.save();
    
            return res.status(200).json({ message: "USER REGISTERED SUCCESSFULLY", user: savedUser }); // 201 Created
        } catch (error) {
            console.error("ERROR IN JOINPOOL CONTROLLER:", error);
            res.status(500).json({ message: "SERVER ERROR" });
        }
}