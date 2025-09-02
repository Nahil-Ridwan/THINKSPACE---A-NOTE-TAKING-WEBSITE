import { useState,useEffect } from "react"
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
      const token = localStorage.getItem('token');
      await api.post("/notes", { title, content }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("NOTE CREATED");
      navigate("/homepage");
    } catch (error) {
      console.log("error creating Note", error);
      if (error.response && error.response.status === 429) {
        toast.error("SLOW DOWN!", { duration: 4000, icon: "😶‍🌫️" });
      }
    } finally {
      setLoading(false);
    }
  }

  // HOTKEY FOR SUBMIT
  /*useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          handleSubmit();
        }
      };
  
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleSubmit]);
  */
    // HOTKEY TO BACK TO HOMEPAGE
    useEffect(() => {
        const handleKeyDown = (e) => {
          if (e.key === 'Escape') {
            navigate("/homepage");
          }
        };
    
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
      }, [navigate]);


  return ( 
    <div className="min-h-screen flex items-center">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto ">
          <Link to={"/homepage"} className ="btn btn-ghost mb-6">
             <ArrowLeftIcon className="size-5"/>
             BACK TO NOTES
          </Link>
          <div className="card bg-black/15 backdrop-blur-md shadow-lg border border-white/10 rounded-xl">
              <div className="card-body">
                  <h2 className="card-title text-2xl mb-4 text-primary">CREATE NEW NOTE</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="form-control mb-4">
                        <label className="label">
                          <span className="label-text text-primary">TITLE</span>
                        </label>
                        <input type="text"  
                        placeholder="NOTE TITLE" 
                        className="input bg-black/5 backdrop-blur-md shadow-lg border border-white/10" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}/>
                    </div>


                    <div className="form-control mb-4">
                      <label className="label">
                          <span className="label-text text-primary">CONTENT</span>
                      </label>
                      <textarea className="textarea bg-black/5 backdrop-blur-md shadow-lg border border-white/10 h-32"
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