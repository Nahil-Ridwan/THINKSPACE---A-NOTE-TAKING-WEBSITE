import {useEffect} from 'react'
import {Link} from "react-router"
import { PlusIcon,LogOut  } from "lucide-react";
import { useNavigate } from 'react-router';
const Navbar = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const handleHotkey = (e) => {
      if (e.key === 'n') {
        e.preventDefault();
        navigate('/create');
      }
    };

    window.addEventListener('keydown', handleHotkey);
    return () => window.removeEventListener('keydown', handleHotkey);
  }, [navigate]);

  return (
    <header className=" bg-black/15 backdrop-blur-md shadow-lg border border-white/10 ">
        <div className="mx-auto max-w-6xl pr-4 py-4">
            <div className="flex items-center justify-between">
              <div className='flex items-start gap-2'>
                <Link to={"/"} className ="btn btn-ghost">
                    <LogOut className="size-7 transform scale-x-[-1]"/>
                </Link>
                <h1 className="text-3xl font-bold font-mono text-primary tracking-tight pt-1">THOUGHTSPACE</h1>
             </div>
                <div className="flex items-center gap-4">
                    <Link to={"/create"} id="create" className="btn btn-primary">
                        <PlusIcon className="size-5"/>
                        <span>NEW NOTE(N)</span>
                    </Link>

                </div>
            </div>
        </div>
    </header>
    
  );
};
export default Navbar;