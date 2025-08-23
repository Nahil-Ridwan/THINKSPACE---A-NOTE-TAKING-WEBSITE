

import { useState } from 'react';
import {Link, useNavigate} from "react-router";
import  toast from 'react-hot-toast';
import { Eye } from "lucide-react";
import api from "../lib/axios";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    try {
      const response = await api.post("/credens",{name, email, password});
      if(response.status===201){
        toast.success("REGISTER SUCCESSFUL");
        navigate("/");
      }

      else{
        toast.error("REGISTER ERROR");
      }
    } catch (error) {
        console.error("ERROR IN REGISTER CONTROLLER", error);
        toast.error("USER ALREADY EXISTS");
        navigate("/");
    }
    finally {
      setIsLoading(false);
    }
  };

  /*const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };*/

  return (
    <div className="flex flex-col min-h-screen justify-center">
      <div className="flex flex-col w-full max-w-md space-y-8 justify-center items-center mx-auto px-4">
        {/* Logo */}
        <div className="text-center">
          <h1 className="text-6xl font-bold font-mono text-primary tracking-tight pt-12">THOUGHTSPACE</h1>
        </div>

        {/* Login Form */}
        <div className="bg-base-300 w-full p-8 rounded-xl shadow-md">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                FULL NAME
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="ri-mail-line text-gray-400 w-5 h-5 flex items-center justify-center"></i>
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-5 pr-3 py-3 border border-gray-600 bg-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                  placeholder="ENTER YOUR NAME"
                />
              </div>
            </div>

            <div>
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
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-5 pr-3 py-3 border border-gray-600 bg-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                  placeholder="ENTER YOUR EMAIL"
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
                   className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-primary focus:outline-none"
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
                  className="w-full pl-5 pr-12 py-3 border bg-base-300 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                  placeholder="ENTER YOUR PASSWORD"
                />
                
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-primary">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary bg-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
                />
                <span className="ml-2 text-sm text-gray-600">REMEMBER ME</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-primary hover:bg-gray-700 text-base-300 font-medium rounded-lg transition duration-200 flex items-center justify-center whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              
              {isLoading ? (
                <>
                  <i className="ri-loader-4-line animate-spin mr-2 w-5 h-5 flex items-center justify-center"></i>
                  SIGNING UP...
                </>
              ) : (
                'SIGN UP'
              )}
            </button>
          </form>


          {/* Sign up link */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              ALREADY HAVE AN ACCOUNT?{' '}
              <Link to={"/"} className="text-primary hover:text-blue-500 font-medium cursor-pointer">
                SIGN IN
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