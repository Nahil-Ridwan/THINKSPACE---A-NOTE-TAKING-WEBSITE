import {useEffect} from 'react'
import {Link} from "react-router"
import { PlusIcon, LogOut, File, Package } from "lucide-react";
import { useNavigate } from 'react-router';
const Navbar = ({toggle, user, showallnote}) => {

  const navigate = useNavigate();
  const notepool = user && user.notepool ? user.notepool : null;

  useEffect(() => {
    const handleHotkey = (e) => {
      if (e.altKey && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        navigate('/cwuh289bn82hn0qihcf802fhcne20ve832-create=true');
      }
      else if (e.altKey && e.key.toLowerCase() === 'p' && notepool) {

        e.preventDefault();
        toggle();
      }
    };

    window.addEventListener('keydown', handleHotkey);
    return () => window.removeEventListener('keydown', handleHotkey);
  }, [navigate, notepool, toggle]);
  return (
    <header className=" bg-black/15 backdrop-blur-md shadow-lg border border-white/10 ">
        <div className="mx-auto max-w-6xl pr-4 py-4">
            <div className="flex items-center justify-between">
              <div className='flex items-start gap-2'>
                <Link to={"/hbicvier943y598hhf7492edfh3984ru-login=true"} className ="btn btn-ghost"  onClick={() => { 
                      localStorage.removeItem("showallnote");
                      console.log(showallnote)
                      localStorage.removeItem("token");}}>
                        
                    <LogOut className="size-7 transform scale-x-[-1]"/>
                </Link>
                <h1 className="text-3xl font-bold font-mono text-primary tracking-tight pt-1">{ showallnote ? `THOUGHTSPACE - ${notepool}` : "THOUGHTSPACE" }</h1>
             </div>
                <div className="flex items-center gap-4">
                    <button onClick={toggle} className='btn btn-primary' disabled={!notepool}>
                        {showallnote ? (
                          <>
                          <File className='scale-[0.75]'/>
                          MY NOTES
                          </>
                        ) : (
                          <>
                          <Package className='size-5'/>
                          POOL NOTES
                          </>
                        )}
                    </button>
                    
                    <Link to={"/cwuh289bn82hn0qihcf802fhcne20ve832-create=true"} id="create" className="btn btn-primary">
                        <PlusIcon className="size-5"/>
                        <span>{showallnote ? "POST TO POOL" : "NEW NOTE"}</span>
                    </Link>
                    

                </div>
            </div>
        </div>
    </header>
    
  );
};
export default Navbar;