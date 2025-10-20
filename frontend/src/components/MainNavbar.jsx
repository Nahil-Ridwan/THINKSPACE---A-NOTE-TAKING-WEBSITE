
import {Link} from "react-router"
import { PlusIcon, Package } from "lucide-react";

const MainNavbar = () => {

  return (
    <header>
        <div className="mx-auto max-w-6xl pt-4 mb-[1px]">
            <div className="flex items-center justify-between">
              <div className='flex items-start gap-2'>
                
             </div>
                <div className="flex items-center gap-4 min-w-[240px] justify-end">
  <Link
  to="/createpool"
  className="group flex items-center justify-start bg-primary rounded-xl overflow-hidden transition-all duration-300 w-12 h-12 hover:w-44 pl-3.5 py-2"
  >
  <div className="flex items-center justify-center w-6 h-6">
    <PlusIcon className="size-5 text-base-300" />
  </div>
  <span className="ml-2 text-gray-800 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
    NEW POOL
  </span>
</Link>

  <Link
  to="/joinpool"
  className="group flex items-center justify-start bg-primary rounded-xl overflow-hidden transition-all duration-300 w-12 h-12 hover:w-44 pl-3.5 py-2"
>
  <div className="flex items-center justify-center w-6 h-6">
    <Package className="size-5 text-base-300" />
  </div>
  <span className="ml-2 text-gray-800 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
    JOIN POOL
  </span>
</Link>
</div>
            </div>
        </div>
    </header>
    
  );
};
export default MainNavbar;