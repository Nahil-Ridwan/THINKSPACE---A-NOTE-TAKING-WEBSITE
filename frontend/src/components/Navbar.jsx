import React from 'react'
import {Link} from "react-router"
import { PlusIcon,LogOut  } from "lucide-react";
const Navbar = () => {
  return (
    <header className="bg-base-300 border-b border-base-content/10">
        <div className="mx-auto max-w-6xl pr-4 py-4">
            <div className="flex items-center justify-between">
              <div className='flex items-start gap-2'>
                <Link to={"/"} className ="btn btn-ghost">
                    <LogOut className="size-7 transform scale-x-[-1]"/>
                </Link>
                <h1 className="text-3xl font-bold font-mono text-primary tracking-tight pt-1">THOUGHTSPACE</h1>
             </div>
                <div className="flex items-center gap-4">
                    <Link to={"/create"} className="btn btn-primary">
                        <PlusIcon className="size-5"/>
                        <span>NEW NOTE</span>
                    </Link>

                </div>
            </div>
        </div>
    </header>
    
  );
};
export default Navbar;