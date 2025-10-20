import React, { useEffect, useState } from 'react'
import Navbar from "../components/Navbar";
import RateLimitUI from "../components/RateLimitUI";
import  api from "../lib/axios";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";
import toast from 'react-hot-toast';
import {jwtDecode} from "jwt-decode";

const HomePage = () => {
  const [IsRateLimited, setIsRateLimited] = useState(false);
  const [notes,setNotes] = useState([]);
  const [loading,setLoading] = useState(true);
  const [showallnote,setShowAllNote] = useState(() => {
    const stored = localStorage.getItem("showallnote");
    return stored === "true";
  });
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
  
  const fetchnotes = async () => {
      try {
        const endpoint = showallnote ? "/notes/allnote" : "/notes";
        const res = await api.get(endpoint, {
          headers: { Authorization: `Bearer ${token}`}
        });
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


  useEffect(() => {
    fetchnotes();
  },[showallnote]);

  const toggle = () => {
    setShowAllNote(prev => {
      const newvalue = !prev;
      localStorage.setItem("showallnote",newvalue);
      return newvalue;
    });
  };

  return (
    <div className=" flex flex-col min-h-screen">
      <Navbar toggle = {toggle} user={user} showallnote = {showallnote}/>

      {IsRateLimited && <RateLimitUI />}
      <div className="max-w-7xl mx-auto p-4 mt-6 rounded-3xl">
          { loading && <div className="text-center text-primary py-10">LOADING...</div>}

          {notes.length === 0 && !IsRateLimited && <NotesNotFound/>}

          {notes.length > 0 && !IsRateLimited && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pl-16 pr-16">
              {notes.map((note,index) => (
                <div>
                  <NoteCard key={index} note={note} setNotes={setNotes} user={user} showallnote = {showallnote}/>
                </div>
              ))}
            </div>
          )}
      </div>
       <footer className=" bg-black/15 backdrop-blur-md shadow-lg border border-white/10 text-center py-4 mt-auto">
          <p className="text-sm text-primary">
           📬 CONTACT: <a href="mailto:nahilpp@gmail.com" className="underline hover:text-primary">nahilpp@gmail.com</a>
         </p>
       </footer>
    </div>
      
  )
};

export default HomePage;