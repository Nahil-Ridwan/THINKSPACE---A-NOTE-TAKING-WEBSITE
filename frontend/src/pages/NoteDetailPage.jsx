import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import api from "../lib/axios";
import toast from "react-hot-toast";
import { Container, LoaderIcon, Trash2Icon, ArrowLeftIcon } from 'lucide-react';
import {Link} from "react-router"

const NoteDetailPage = () => {
  const [note,setNote] = useState(null);
  const [loading,setLoading] = useState(true);
  const [saving,setSaving] = useState(false);

  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    const fetchNote = async() => {
      try {
        const res = await api.get(`/notes/${id}`)
        setNote(res.data)
      } catch (error) {
        toast.error("FAILED TO GET NOTES");
        console.log("ERROR IN FETCHNOTE",error);
      } finally {
        setLoading(false);
      }
       
    }
    fetchNote();
  },[id])

  const handleDelete = async () => {
    if(!window.confirm("SURE TO DELETE")) return;

    try {
      await api.delete(`/notes/${id}`)
      toast.success("NOTE DELETED")
      navigate("/")
    } catch (error) {
      console.log("error in the handledelete at NoteDetailPage",error)
      toast.error("COULD'NT DELETE")
    }
  };
  const handleSave = async () => {
    if(!note.title.trim() || !note.content.trim())
    {
      toast.error("FILL ALL FIELDS")
      return;
    }

    setSaving(true)

    try {
      await api.put(`/notes/${id}`,note)
      toast.success("CHANGES SAVED")
      navigate("/")
    } catch (error) {
      console.log("error in handlesave",error)
      toast.error("CHNAGES NOT SAVED")
    } finally{
      setSaving(false)
    }
  }

  if(loading)
  {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10"/>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
         <div className="flex items-center justify-between mb-6">
           <Link to="/homepage" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5"/>
               BACK TO NOTES
           </Link>
           <button onClick={handleDelete} className="btn btn-error btn-outline">
             <Trash2Icon className="h-5 w-5"/>
             DELETE NOTE
           </button>
         </div>
           <div className="card bg-base-100">
              <div className="card-body">
                <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text text-primary">TITLE</span>
                    </label>
                    <input 
                    type="text" 
                    placeholder="NOTE TITLE" 
                    className="input input-bordered" 
                    value={note.title}
                    onChange={(e) => setNote({...note,title:e.target.value})}/>
                </div>

                <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text text-primary">CONTENT</span>
                    </label>
                    <textarea 
                    placeholder="WRITE YOUR NOTE HERE..." 
                    className="textarea textarea-bordered h-32" 
                    value={note.content}
                    onChange={(e) => setNote({...note,content:e.target.value})}/>
                </div>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                      {saving ? "SAVING..." : "SAVE CHANGES"}
                  </button>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage;