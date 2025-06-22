import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VerifyEmail from "./VerifyEmail";
import ExpenseForm from "./ExpenseForm";
import "../styles/Welcome.css";

function Welcome() {
    const navigate=useNavigate();
    const handleLogout=()=>{
        localStorage.removeItem("token");
        navigate("/login");
    }
    const handleCompleteProfile=()=>{
        navigate("/complete-profile");
    }

     useEffect(()=>{
            const token=localStorage.getItem("token");
            if(!token){
                navigate("/login");
            }
        },[navigate])
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>🎉 Welcome to Expense Tracker!</h1>
      <p>Your Profile is incomplete</p>
      <button onClick={handleCompleteProfile}>Complete Profile</button>
      <br/>
      <button onClick={handleLogout} className="logoutBtn">Logout</button>
      <VerifyEmail/>
      <ExpenseForm/>
    </div>
  );
}

export default Welcome;
