

import { useState } from 'react';
import {Link,useNavigate} from "react-router";
import  toast from 'react-hot-toast';
import { Eye } from "lucide-react";
import api from "../lib/axios";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    try{
       const loginSuccess = await api.post("/credens/login",{email, password});
       if (loginSuccess.status === 201) {
         toast.success('LOGIN SUCCESSFUL');
         navigate("/homepage");
       }
  
  
  } catch (error) {
      const status = error.response?.status;
      if (status === 401) {
        toast.error("WRONG PASSWORD");
      } else if (status === 404) {
        toast.error("USER NOT FOUND");
      } else {
        toast.error("SERVER ERROR");
      }
      
      console.error("ERROR IN LOGIN CONTROLLER", error);
   
    setIsLoading(false);
     }finally {
    setIsLoading(false);
  }
};

  return (
    <div className="flex flex-col min-h-screen justify-center">
      <div className="flex flex-col w-full max-w-md space-y-8 justify-center items-center mx-auto px-4">
        {/* Logo */}
        <div className="text-center">
          <h1 className="text-6xl font-bold font-mono text-primary tracking-tight pt-16">THOUGHTSPACE</h1>
        </div>

        {/* Login Form */}
        <div className="bg-base-300 w-full p-8 rounded-xl shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
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
              <Link href="/forgot-password" className="text-sm text-primary hover:text-blue-500 cursor-pointer">
                FORGOT PASSWORD?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-primary hover:bg-gray-700 text-base-300 font-medium rounded-lg transition duration-200 flex items-center justify-center whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              
              {isLoading ? (
                <>
                  <i className="ri-loader-4-line animate-spin mr-2 w-5 h-5 flex items-center justify-center"></i>
                  SIGNING IN...
                </>
              ) : (
                'SIGN IN'
              )}
            </button>
          </form>


          {/* Sign up link */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              DON'T HAVE AN ACCOUNT?{' '}
              <Link to={"/register"} className="text-primary hover:text-blue-500 font-medium cursor-pointer">
                SIGN UP
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