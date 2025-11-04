import React from "react";
import { House } from "lucide-react";
import { useNavigate } from "react-router";



const LandingPage = () => {
  const navigate = useNavigate();

  const register = async (e) => {
    navigate("/nun3485u03nvjhefngf38u4jmcf398utj-register=true")
  }
  const login = async (e) => {
    navigate("/hbicvier943y598hhf7492edfh3984ru-login=true");
  }
  const hotkey = async (e) => {
    navigate("/bjj36bb378df3983fhnbf3i8yfncdjh393-hotkey=true");
  }
  const about = async (e) => {
    navigate("/bcwi92n283n28unx023uj0cx023jcxn02h-about=true")
  }
  const contact = async (e) => {
    navigate("/hbdciu2y893hnc982h39cbn82vg3cvxwc-contact=true")
  }

  return (
    <div className="min-h-screen flex  justify-center items-center p-5 font-['Inter',sans-serif] relative">
      {/* Ambient Background Shapes */}
      <div className="ambient-bg hidden md:block absolute inset-0 overflow-hidden opacity-10 -z-10">
        <div className="ambient-blob top-1/4 left-1/4"></div>
        <div
          className="ambient-blob top-3/4 right-1/4"
          style={{ background: "#e5e7eb" }}
        ></div>
      </div>

      {/* Main Dashboard Container */}
      <div className="w-full max-w-6xl bg-[#1c444e] backdrop-blur-md shadow-lg border border-white/10 bento-card rounded-3xl p-6 lg:p-8 relative z-10">
        {/* Header / Navigation */}
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-8">
            {/* Clock/Logo Icon */}
            <House className="size-7"/>
            <nav className="text-[33px] leading-tight tracking-tight font-extrabold text-gray-100 ">
              <h1>THOUGHTSPACE</h1>
            </nav>
          </div>
          {/* Auth Buttons */}
          <div className="flex space-x-3 text-sm font-semibold">
            <button className="px-5 py-2 bg-card-dark text-white rounded-xl hover:bg-black transition duration-150" onClick={hotkey}>
              HOTKEYS
            </button>
            <button className="px-5 py-2 bg-card-dark text-white rounded-xl hover:bg-black transition duration-150" onClick={about}>
              ABOUT
            </button>
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-10">
          {/* Card 1: Large Black Card */}
          <div className="col-span-1 md:col-span-6 bg-[#b75383] text-white rounded-2xl bento-card p-8 min-h-[500px] flex flex-col justify-between relative overflow-hidden" onClick={register}>
            <div className="absolute bottom-0 right-0 w-3/4 h-3/4 opacity-90 transform translate-x-1/4 translate-y-1/4">
              <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full opacity-70"
              >
                <rect
                  x="25"
                  y="40"
                  width="30"
                  height="30"
                  rx="6"
                  fill="#000"
                  stroke="#fff"
                  strokeWidth="2"
                />
                <circle cx="40" cy="55" r="5" fill="#fff" />
                <rect
                  x="55"
                  y="65"
                  width="20"
                  height="20"
                  rx="4"
                  fill="#1c1c1c"
                  stroke="#fff"
                  strokeWidth="1"
                />
                <path
                  d="M40 70 L40 75 A5 5 0 0 0 45 80 L50 80"
                  stroke="#fff"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>

            <div className="relative z-10">
              <p className="text-xs uppercase font-semibold text-gray-800 mb-2 pl-1">
                take and share notes with ease
              </p>
              <h2 className="text-5xl font-extrabold leading-tight tracking-tight">
                Become a member today!
              </h2>
            </div>

            <div className="relative z-10">
              <button className="px-6 py-3 bg-white text-[#0E1D21] rounded-xl text-sm font-semibold flex items-center space-x-2 hover:bg-gray-100 transition duration-150">
                <span className="uppercase">GET STARTED</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
              <p className="text-xs uppercase font-semibold text-gray-800 mt-2 pl-2">
                register here
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-1 md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 auto-rows-min">
            {/* Card 2 */}
            <div className="col-span-1 sm:col-span-2 bg-warning text-gray-800 rounded-2xl bento-card p-8 min-h-[240px] relative overflow-hidden flex flex-col justify-between" onClick={about}>
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gray-300 rounded-full mix-blend-multiply filter blur-2xl transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-5 right-5 w-24 h-24 bg-gray-400 rounded-full mix-blend-multiply filter blur-xl"></div>
              </div>
              <div className="relative z-10">
                <p className="text-xs uppercase font-semibold text-gray-700">
                  The note app chosen by millions
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 absolute top-0 right-0 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
              <h2 className="text-4xl font-extrabold relative z-10">
                View our blog
              </h2>
            </div>

            {/* Card 3 */}
            <div className="col-span-1 bg-accent text-white rounded-2xl bento-card p-8 min-h-[240px] flex flex-col justify-end relative" onClick={login}>
              <p className="text-xs uppercase font-semibold text-violet-600">
                Let's take notes
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 absolute top-6 right-6 text-violet-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
              <h2 className="text-3xl text-black font-extrabold mt-2">Login</h2>
            </div>

            {/* Card 4 */}
            <div className="col-span-1 bg-success text-black rounded-2xl bento-card p-8 min-h-[240px] flex flex-col justify-end relative" onClick={contact}>
              <p className="text-xs uppercase font-semibold text-green-800">
                Have any questions?
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 absolute top-6 right-6 text-green-800 rotate-90"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              <h2 className="text-3xl font-extrabold mt-2">Contact us</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        .bento-card {
          border: 2px solid rgba(0, 0, 0, 0.05);
          box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.05);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .bento-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px -8px rgba(0, 0, 0, 0.08);
        }
        .ambient-blob {
          position: absolute;
          width: 400px;
          height: 400px;
          background: #d1d5db;
          border-radius: 50%;
          filter: blur(100px);
          transform: translate(-50%, -50%);
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
