import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import api from "../lib/axios";
import toast from "react-hot-toast";
import { LoaderIcon, Trash2Icon, ArrowLeftIcon } from 'lucide-react';
import {Link} from "react-router"
import { jwtDecode } from 'jwt-decode';

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
      const token = localStorage.getItem('token');
      await api.delete(`/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("NOTE DELETED")
      navigate("/homepage")
    } catch (error) {
      console.log("error in the handledelete at NoteDetailPage",error)
      toast.error("COULD'NT DELETE")
    }
  };

  //HOTKEY FOR DELETE
  useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === 'Delete' && email === note.email) {
      handleDelete();
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [handleDelete]);

  const handleSave = async () => {
    if(!note.title.trim() || !note.content.trim())
    {
      toast.error("FILL ALL FIELDS")
      return;
    }

    setSaving(true)

    try {
      const token = localStorage.getItem('token');
      await api.put(`/notes/${id}`, note, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("CHANGES SAVED")
      navigate("/homepage")
    } catch (error) {
      console.log("error in handlesave", error)
      toast.error("CHNAGES NOT SAVED")
    } finally {
      setSaving(false)
    }
  }

  const [user,setUser] = useState(null);
    
  const token = localStorage.getItem('token');
    
  useEffect(() => {
    if(token) {
      try {
         const decoded = jwtDecode(token);
         setUser(decoded);
       } catch (e) {
         setUser(null);
       }
    }
  },[token]);

  const email = user && user.email ? user.email : null;

  // HOTKEY FOR SAVE
/*    useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && email === note.email) {
        handleSave();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSave]);
*/
  //HOTKEY TO BACK TO HOMEPAGE
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        navigate("/homepage");
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);


  if(loading)
  {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10"/>
      </div>
    );
  }



  return (
    <div className="min-h-screen flex items-center">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
         <div className="flex items-center justify-between mb-6">
           <Link to="/homepage" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5"/>
               BACK TO NOTES
           </Link>
           <button onClick={handleDelete} disabled={email !== note.email} className="btn btn-error btn-outline">
             <Trash2Icon className="h-5 w-5"/>
             DELETE NOTE
           </button>
         </div>
           <div className="card bg-black/15 backdrop-blur-md shadow-lg border border-white/10 rounded-xl">
              <div className="card-body">
                <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text text-primary">TITLE</span>
                    </label>
                    <input 
                    type="text" 
                    placeholder="NOTE TITLE" 
                    className="input bg-black/5 backdrop-blur-md shadow-lg border border-white/10" 
                    value={note.title}
                    onChange={(e) => setNote({...note,title:e.target.value})}/>
                </div>

                <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text text-primary">CONTENT</span>
                    </label>
                    <textarea 
                    placeholder="WRITE YOUR NOTE HERE..." 
                    className="textarea bg-black/5 backdrop-blur-md shadow-lg border border-white/10 h-32" 
                    value={note.content}
                    onChange={(e) => setNote({...note,content:e.target.value})}/>
                </div>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary " disabled={saving || email !== note.email} onClick={handleSave}>
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