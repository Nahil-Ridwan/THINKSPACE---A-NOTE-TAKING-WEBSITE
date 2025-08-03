import React, { useState } from "react"
import { ArrowLeftIcon } from "lucide-react";
import {Link, useNavigate} from "react-router";
import toast from "react-hot-toast";
import api from "../lib/axios";

const CreatePage = () => {
  const[title,setTitle] = useState("");
  const [content,setContent] = useState("");
  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!title.trim() || !content.trim())
    {
      toast.error("FILL ALL FIELDS");
      return;
    }
    setLoading(true);
    try {
      await api.post("/notes",{title,content});
      toast.success("NOTE CREATED");
      navigate("/");
    } catch (error) {
      console.log("error creating Note",error)
      if(error.response.status === 429)
      {
        toast.error("SLOW DOWN!",{duration : 4000 , icon:"😶‍🌫️",})
      }
    }
      finally
      {
        setLoading(false);
      }
  }
  return ( 
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto ">
          <Link to={"/"} className ="btn btn-ghost mb-6">
             <ArrowLeftIcon className="size-5"/>
             BACK TO NOTES
          </Link>
          <div className="card bg-base-100">
              <div className="card-body">
                  <h2 className="card-title text-2xl mb-4 text-primary">CREATE NEW NOTE</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="form-control mb-4">
                        <label className="label">
                          <span className="label-text text-primary">TITLE</span>
                        </label>
                        <input type="text"  
                        placeholder="NOTE TITLE" 
                        className="input input-bordered" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}/>
                    </div>


                    <div className="form-control mb-4">
                      <label className="label">
                          <span className="label-text text-primary">CONTENT</span>
                      </label>
                      <textarea className="textarea textarea-bordered h-32"
                        placeholder="ENTER YOUR CONTENT"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}/>
                    </div>



                    <div className="card-actions justify-end">
                      <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? "CREATING..." : "CREATE NOTE"}
                      </button>
                    </div>
                      
                  </form>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage;