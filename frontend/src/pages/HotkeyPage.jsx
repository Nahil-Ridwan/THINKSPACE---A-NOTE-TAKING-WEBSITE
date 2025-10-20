import { useEffect } from 'react'
import { Link, useNavigate } from "react-router"
import { ArrowLeftIcon } from 'lucide-react'

const HotkeyPage = () => {

  const navigate = useNavigate();
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
                  <h2 className="card-title font-bold text-2xl mb-4 text-primary">HOTKEYS</h2>
                  <h3 className='text-xl ml-6 font-bold text-primary'>Login Page</h3>
                     <div className='ml-11 space-y-4'>
                        <p>New Pool &nbsp; - &nbsp;  <kbd className="kbd text-[15px]">Alt</kbd> + <kbd className="kbd text-[15px]">n</kbd></p>
                        <p>Join Pool &nbsp; - &nbsp; <kbd className="kbd text-[15px]">Alt</kbd> + <kbd className="kbd text-[15px]">j</kbd></p>
                     </div>

                  <h3 className='text-xl ml-6 font-bold text-primary'>Home Page</h3>
                     <div className='ml-11 space-y-4'>
                        <p>Create Note &nbsp; - &nbsp;  <kbd className="kbd text-[15px]">Alt</kbd> + <kbd className="kbd text-[15px]">n</kbd></p>
                        <p>Switch Mode &nbsp; - &nbsp; <kbd className="kbd text-[15px]">Alt</kbd> + <kbd className="kbd text-[15px]">p</kbd></p>
                     </div>

                  <h3 className='text-xl ml-6 font-bold text-primary'>Note Page</h3>
                     <div className='ml-11 space-y-4'>
                        <p>Delete Note &nbsp; - &nbsp;  <kbd className="kbd">Del</kbd></p>
                     </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotkeyPage