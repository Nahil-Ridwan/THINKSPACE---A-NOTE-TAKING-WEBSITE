import Note from "../models/note.js";

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