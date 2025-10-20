import { useEffect } from 'react'
import { Link, useNavigate } from "react-router"
import { ArrowLeftIcon } from 'lucide-react'

const AboutPage = () => {

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
    <div className="max-w-2xl mx-auto">
      <Link to={"/"} className="btn btn-ghost mb-6">
        <ArrowLeftIcon className="size-5" />
        BACK
      </Link>
      <div className="card bg-black/15 backdrop-blur-md shadow-lg border border-white/10 rounded-xl">
        <div className="card-body">
          <h2 className="card-title font-bold text-2xl mb-4 text-primary">ABOUT US</h2>
          <p className="text-base text-white/80 mb-6">
            Welcome to ThoughtSpace, your personal and shared canvas for ideas, reflections, and collaboration.
            <br />&nbsp; We believe that notes are more than just reminders—they're fragments of thought, sparks of creativity, and building blocks of shared understanding. Whether you're jotting down personal reflections, organizing your day, or contributing to a collective pool of knowledge, ThoughtSpace is designed to support every kind of note-taker.

          </p>

          <h3 className="text-xl ml-6 font-bold text-primary">FOR YOU</h3>
          <p className="ml-6 text-white/70 mb-4">
            Capture your thoughts privately with a clean, distraction-free interface. Every note is archived with rich metadata, so your ideas stay organized and accessible for life.
          </p>

          <h3 className="text-xl ml-6 font-bold text-primary">FOR EVERYONE</h3>
          <p className="ml-6 text-white/70 mb-4">
           Join or create a NotePool—a shared space where multiple users can post, read, and build on each other's notes. Perfect for study groups, project teams, or communities with a common goal.

          </p>

          <h3 className="text-xl ml-6 font-bold text-primary">SECURE</h3>
          <p className="ml-6 text-white/70 mb-4">
           Choose what stays personal and what goes public. ThoughtSpace gives you full control over visibility and collaboration.
          </p>

          <h3 className="text-xl ml-6 font-bold text-primary">NOTE MANAGEMENT</h3>
          <p className="ml-6 text-white/70">
           Create, edit, and share notes with rich metadata and lifelong accessibility.
          </p><br />
          <p className='text-white/70'>Whether you're reflecting solo or building something together, ThoughtSpace is where your ideas find structure, meaning, and connection.</p>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default AboutPage