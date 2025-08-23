import {Note} from "../models/note.js"; //LOGIN
import {Creden} from "../models/creden.js"; //REGISTER

// LOGIN
export async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await Creden.findOne({email});

        if(user && user.password === password) {
            return res.status(201).json({ message: "LOGIN SUCCESSFUL"});
        }else if(!user){
            return res.status(404).json({ message: "USER NOT FOUND"});
        } else if (user && user.password !== password) {
            return res.status(401).json({ message: "WRONG PASSWORD"});
        }
    }catch (error) {
        console.error("ERROR IN LOGIN CONTROLLER", error);
        res.status(500).json({ message: "SERVER ERROR" });
    }
}


export async function register(req, res) {
    try {
        const { name, email, password } = req.body;
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


export async function getnote(_, res)  {
    try {
        const notes = await Note.find().sort({createdAt : -1});
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
        const {title,content} = req.body;
        const note = new Note({title,content});

        const savednote = await note.save();
        res.status(201).json(savednote)    

    } catch (error) {
        console.error("ERROR IN POSTNOTE CONTROLLER",error);
        res.status(500).json({message : "SERVER ERROR"});

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