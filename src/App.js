import {Routes,Route} from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Welcome from "./pages/Welcome";
import CompleteProfile from "./pages/CompleteProfile";

function App() {
  return (
    <div className="App">
      <Navbar/>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/welcome" element={<Welcome/>}/>
      <Route path="/complete-profile" element={<CompleteProfile/>}/>
     </Routes>
    </div>
  );
}

export default App;
