import { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router"
import { ArrowLeftIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import api from "../lib/axios";

const ContactPage = () => {

  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [content,setContent] = useState("");
  const [loading,setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!name.trim() || !content.trim()) {
        toast.error("FILL ALL FIELDS");
        return;
    }
    setLoading(true);
    try {
      const submitted = await api.post("/reviews",{ name, content });
      if (submitted.status === 200) {
        toast.success("SUBMITTED SUCCESFULLY");
        navigate("/")
      }
    } catch (error) {
      console.log("ERROR IN REVIEW HANDLE",error);
      toast.error("COULDN'T SUBMIT")
    } finally {
        setLoading(false);
    }
  }

  useEffect(() => {
          const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
              navigate("/");
            }
          };
      
          window.addEventListener('keydown', handleKeyDown);
          return () => window.removeEventListener('keydown', handleKeyDown);
        }, [navigate]);


  return (
    <div className="min-h-screen flex items-center">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto ">
          <Link to={"/"} className ="btn btn-ghost mb-6">
             <ArrowLeftIcon className="size-5"/>
             BACK
          </Link>
          <div className="card bg-black/15 backdrop-blur-md shadow-lg border border-white/10 rounded-xl">
              <div className="card-body">
                  <h2 className="card-title text-2xl font-bold mb-4 text-primary">CONTACT US</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="form-control mb-4">
                        <label className="label">
                          <span className="label-text text-primary">NAME</span>
                        </label>
                        <input type="text"  
                        placeholder="ENTER YOUR NAME" 
                        className="input bg-black/5 backdrop-blur-md shadow-lg border border-white/10" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}/>
                    </div>


                    <div className="form-control mb-4">
                      <label className="label">
                          <span className="label-text text-primary">CONTENT</span>
                      </label>
                      <textarea className="textarea bg-black/5 backdrop-blur-md shadow-lg border border-white/10 h-32"
                        placeholder="WHAT'S ON YOUR MIND"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}/>
                    </div>



                    <div className="card-actions justify-end">
                      <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? "SENDING..." : "SEND"}
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

export default ContactPage