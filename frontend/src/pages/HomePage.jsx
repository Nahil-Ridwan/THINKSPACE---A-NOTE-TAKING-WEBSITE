import React, { useEffect, useState } from 'react'
import Navbar from "../components/Navbar";
import RateLimitUI from "../components/RateLimitUI";
import  api from "../lib/axios";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";

const HomePage = () => {
  const [IsRateLimited, setIsRateLimited] = useState(false);
  const [notes,setNotes] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    const fetchnotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);                           //FETCH SUCCESS
        setIsRateLimited(false);
      } catch (error) {
        console.log("ERROR FETCHING");
        if(error.response.status === 429)
           setIsRateLimited(true);
        else{                                         //FETCH FAIL
          toast.error("COULD'NT LOAD NOTES")
        }
      } finally {
        setLoading(false);
      }
    };
    fetchnotes();
  },[]);

  return (
    <div className=" flex flex-col min-h-screen">
      <Navbar/>

      {IsRateLimited && <RateLimitUI />}
      <div className="max-w-7xl mx-auto p-4 mt-6 rounded-3xl">
          { loading && <div className="text-center text-primary py-10">LOADING...</div>}

          {notes.length === 0 && !IsRateLimited && <NotesNotFound/>}

          {notes.length > 0 && !IsRateLimited && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pl-16 pr-16">
              {notes.map(note => (
                <div>
                  <NoteCard key={note._id} note={note} setNotes={setNotes}/>
                </div>
              ))}
            </div>
          )}
      </div>
       <footer className="bg-base-300 text-center py-4 mt-auto">
          <p className="text-sm text-primary">
           📬 CONTACT: <a href="mailto:nahilpp@gmail.com" className="underline hover:text-primary">nahilpp@gmail.com</a>
         </p>
       </footer>
    </div>
      
  )
};

export default HomePage;