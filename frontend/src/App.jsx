
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
        <Route path = "/hbicvier943y598hhf7492edfh3984ru-login=true" element={<LoginPage/>}/>
        <Route path = "/nun3485u03nvjhefngf38u4jmcf398utj-register=true" element={<SignUpPage/>}/>

        <Route path = "/hb238frnbc3984enc93848bncv398jh4bc9348-joinpool=true" element={<JoinPool/>}/>
        <Route path = "/bued73bihdebc738bichb39hbcih3b993-createpool=true" element={<CreatePool/>}/>

        <Route path = "/" element={<LandingPage/>}/>
        <Route path = "/bjj36bb378df3983fhnbf3i8yfncdjh393-hotkey=true" element={<HotkeyPage/>}/>
        <Route path = "/bcwi92n283n28unx023uj0cx023jcxn02h-about=true" element={<AboutPage/>}/>
        <Route path = "/hbdciu2y893hnc982h39cbn82vg3cvxwc-contact=true" element={<ContactPage/>}/>

        <Route path ="/nciu32983hfcb938vcbn93rfbn938b33f3r3-homepage=true" element={<HomePage/>}/>
        <Route path ="/cwuh289bn82hn0qihcf802fhcne20ve832-create=true" element={<Createpage/>}/>
        <Route path ="/note/:id" element={<NoteDetailPage/>}/>
      </Routes> 
    </div>
  )
}

export default App;