import { useState,useEffect } from 'react';
import {Link,useNavigate} from "react-router";
import  toast from 'react-hot-toast';
import { Eye } from "lucide-react";
import api from "../lib/axios";
import { Package } from 'lucide-react';

export default function JoinPool() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [notepool, setNotepool] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Login process: do NOT send Authorization header for login
    try {
      const joined = await api.post("/pools/joinpool", { email, notepool, password });
      
      if(joined.status === 201) {
        toast.success("JOINED NOTEPOOL SUCCESFULLY")
        navigate("/hbicvier943y598hhf7492edfh3984ru-login=true");
      }
      else if(joined.status === 202) {
        toast.error("USER ALREADY REGISTERED")
        navigate("/hbicvier943y598hhf7492edfh3984ru-login=true");
      }
      else{
        toast.error("REGISTER ERROR");
      }
      }
     catch (error) {
        const status = error.response?.status;
        if(status === 403) {
          toast.error("WRONG PASSWORD");
        }
        else if (status === 405) {
          toast.error("USER NOT FOUND");
        }
        else if(status === 404) {
          toast.error("POOL NOT FOUND");
        }
        else {
           console.error("ERROR IN JOINPOOL CONTROLLER", error);
           toast.error("ERROR");
        }
        setIsLoading(false);
      } finally {
      setIsLoading(false);
    }
  };

  // HOTKEY FOR LOGIN
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSubmit(e);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSubmit]);

  return (
    <div className="flex flex-col min-h-screen justify-center">
      <div className="flex flex-col w-full max-w-md space-y-8 justify-center items-center my-auto mx-auto px-4">

        {/* Login Form */}
        <div className="w-full p-8 rounded-xl card bg-black/20 backdrop-blur-md shadow-lg border border-white/10 mt-12">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <h1 className="text-4xl font-bold text-primary mb-6">JOIN POOL</h1>
              <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                EMAIL ADDRESS
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="ri-mail-line text-gray-400 w-5 h-5 flex items-center justify-center"></i>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value.toLowerCase())}
                  className="w-full pl-5 pr-3 py-3  bg-black/5 backdrop-blur-md shadow-lg border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                  placeholder="ENTER YOUR EMAIL"
                />
              </div>
            </div>

            <div>
              <label htmlFor="notepool" className="block text-sm font-medium text-primary mb-2">
                POOL NAME
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="ri-mail-line text-gray-400 w-5 h-5 flex items-center justify-center"></i>
                </div>
                <input
                  id="notepool"
                  name="notepool"
                  type="notepool"
                  value={notepool}
                  required
                  onChange={(e) => setNotepool(e.target.value)}
                  className="w-full pl-5 pr-3 py-3  bg-black/5 backdrop-blur-md shadow-lg border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                  placeholder="ENTER POOL NAME"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-primary mb-2">
                PASSWORD
              </label>
              <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="ri-lock-line text-gray-400 w-5 h-5 flex items-center justify-end"></i>
                </div>
                <button
                   type="button"
                   onClick={() => setShowPassword(!showPassword)}
                   className="absolute mb-3 inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-primary focus:outline-none"
                >
                  <Eye className="w-5 h-5" />
                  
                </button>

                <input
                  id="password"
                  name="password"
                  
                  required
                  value={password}
                  type={showPassword ? 'text' : 'password'}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-5 pr-12 py-3 mb-3 border bg-base-300 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                  placeholder="ENTER POOL PASSWORD"
                />
                
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-primary hover:bg-gray-700 text-base-300 font-medium rounded-lg transition duration-200 flex items-center justify-center whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              
              {isLoading ? (
                <>
                  <i className="ri-loader-4-line animate-spin mr-2 w-5 h-5 flex items-center justify-center"></i>
                  JOINING...
                </>
              ) : (
                'JOIN'
              )}
            </button>
          </form>


          {/* Sign up link */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              CREATE YOUR OWN POOL :{' '}
              <Link to={"/bued73bihdebc738bichb39hbcih3b993-createpool=true"} className="text-primary hover:text-blue-500 font-medium cursor-pointer">
                CREATE
              </Link>
            </p>
          </div>
        </div>
      </div>
      <footer className="bg-base-300 text-center py-4 mt-auto">
          <p className="text-sm text-primary">
           📬 CONTACT: <a href="mailto:nahilpp@gmail.com" className="underline hover:text-primary">nahilpp@gmail.com</a>
         </p>
       </footer>
    </div>
  );
}