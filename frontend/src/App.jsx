
import {Route, Routes} from "react-router";
import "./background.css"

import HomePage from "./pages/HomePage.jsx";
import Createpage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import CreatePool from "./pages/CreatePool"
import JoinPool from "./pages/JoinPool.jsx";
import LandingPage from "./pages/LandingPage.jsx"
import HotkeyPage from "./pages/HotkeyPage.jsx"
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";

const App = () => {
  return (
    <div className="background">
      <Routes>
        <Route path = "/login" element={<LoginPage/>}/>
        <Route path = "/register" element={<SignUpPage/>}/>

        <Route path = "/joinpool" element={<JoinPool/>}/>
        <Route path = "/createpool" element={<CreatePool/>}/>

        <Route path = "/" element={<LandingPage/>}/>
        <Route path = "/hotkey" element={<HotkeyPage/>}/>
        <Route path = "/about" element={<AboutPage/>}/>
        <Route path = "/contact" element={<ContactPage/>}/>

        <Route path ="/homepage" element={<HomePage/>}/>
        <Route path ="/create" element={<Createpage/>}/>
        <Route path ="/note/:id" element={<NoteDetailPage/>}/>
      </Routes> 
    </div>
  )
}

export default App;