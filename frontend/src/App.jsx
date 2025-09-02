
import {Route, Routes} from "react-router";
import "./background.css"

import HomePage from "./pages/HomePage.jsx";
import Createpage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
const App = () => {
  return (
    <div className="background">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#dc783d_100%)]" />
      <Routes>
        <Route path = "/" element={<LoginPage/>}/>
        <Route path = "/register" element={<SignUpPage/>}/>
        <Route path ="/homepage" element={<HomePage/>}/>
        <Route path ="/create" element={<Createpage/>}/>
        <Route path ="/note/:id" element={<NoteDetailPage/>}/>
      </Routes> 
    </div>
  )
}

export default App;