import React from 'react'
import {Link} from "react-router";
import { PenSquareIcon,Trash2Icon } from 'lucide-react';
import formatDate from "../lib/utils.js";
import api from "../lib/axios"
import toast from "react-hot-toast"

const NoteCard = ({note, setNotes, user, showallnote}) => {
    const handleDelete = async(e,id) =>{
        e.preventDefault(); // NO NAVIGATION
        const token = localStorage.getItem('token');
        if(!window.confirm("SURE TO DELETE?")) return;

        try {
            await api.delete(`/notes/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNotes((prev) => prev.filter((note) => note._id !== id)); // REMOVE DELETED ONES FROM UI
            toast.success("NOTE DELETED");
        } catch (error) {
            console.log("error in handledelete",error);
            toast.error("COULD'NT DELETE")
        }
    }
    const email = user && user.email ? user.email : null;
    const isowner = email === note.email;
  return (
    <Link to={`/note/${note._id}`}
    className={`card backdrop-blur-md shadow-lg borderrounded-xl hover:shadow-lg transition-all duration-200 border-t-4 border-solid w-[22rem] ${isowner && showallnote ? 'border-[#63e89b]' : 'border-[#ff6a00]'} `}
    >
        <div className="card-body bg-black/15 backdrop-blur-md shadow-lg border border-white/20 rounded-xl h-56">
            <div className="flex justify-center w-full">
              <h3 className={`card-title ${isowner && showallnote ? 'text-[#72d99d]' : 'text-[#fe8630]'} text-center`}>{note.title}</h3>
            </div>
            <p className="text-base-content/70 line-clamp-3 whitespace-pre-line">{note.content}</p>
            <div className="card-actions justify-between items-center mt-4">
                <span className="text-sm text-base-content/60">
                    {formatDate(new Date(note.createdAt))}
                </span>
                <div className="flex items-center gap-1">
                    { isowner && <PenSquareIcon className="size-4"/> }
                   <button className="btn btn-ghost btn-xs text-error" 
                    onClick={(e) => isowner && handleDelete(e, note._id)}
                    disabled = {!isowner}
                    >
                    { isowner && <Trash2Icon className="size-4"/> }
                    </button> 
                </div>

            </div>
        </div>
    </Link>
  )
}

export default NoteCard;