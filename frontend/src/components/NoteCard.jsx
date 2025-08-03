import React from 'react'
import {Link} from "react-router";
import { PenSquareIcon,Trash2Icon } from 'lucide-react';
import formatDate from "../lib/utils";
import api from "../lib/axios"
import toast from "react-hot-toast"

const NoteCard = ({note,setNotes}) => {
    const handleDelete = async(e,id) =>{
        e.preventDefault(); // NO NAVIGATION
        if(!window.confirm("SURE TO DELETE?")) return;

        try {
            await api.delete(`/notes/${id}`);
            setNotes((prev) => prev.filter((note) => note._id !==id)); // REMOVE DELETED ONES FROM UI
            toast.success("NOTE DELETED")
        } catch (error) {
            console.log("error in handledelete",error);
            toast.error("COULD'NT DELETE")
        }
    }
  return (
    <Link to={`/note/${note._id}`}
        className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#ff6a00]"
    >
        <div className="card-body bg-base-300 rounded-xl h-56"> 
            <div className="flex justify-center w-full">
              <h3 className="card-title text-primary text-center">{note.title}</h3>
            </div>
            <p className="text-base-content/70 line-clamp-3">{note.content}</p>
            <div className="card-actions justify-between items-center mt-4">
                <span className="text-sm text-base-content/60">
                    {formatDate(new Date(note.createdAt))};
                </span>
                <div className="flex items-center gap-1">
                    <PenSquareIcon className="size-4"/>
                   <button className="btn btn-ghost btn-xs text-error" onClick={(e) => handleDelete(e, note._id)}>
                    <Trash2Icon className="size-4"/>
                    </button> 
                </div>

            </div>
        </div>
    </Link>
  )
}

export default NoteCard;