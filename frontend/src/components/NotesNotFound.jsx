import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";

const NotesNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
      <div className="bg-primary/10 rounded-3xl p-8">
        <NotebookIcon className="size-10 text-primary" />
      </div>
      <h3 className="text-2xl font-bold">NO NOTES YET</h3>
      <p className="text-base-content/70">
        READY TO ORGANIZE YOUR THOUGHTS? CREATE YOUR FIRST NOTE TO GET STARTED ON YOUR JOURNEY.
      </p>
      <Link to="/create" className="btn btn-primary">
        CREATE YOUR FIRST NOTE(N)
      </Link>
    </div>
  );
};
export default NotesNotFound;