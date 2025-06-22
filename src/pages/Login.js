import { useState } from "react";
import { auth } from "../firebase/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[error,setError]=useState("");
    const[loading,setLoading]=useState(false);
    const navigate=useNavigate();
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setError("");
        setLoading(true);
        
        if(!email || !password){
            setError("All fields are required!!");
            setLoading(false);
            return;
        }
        try {
          const userCredentials=await signInWithEmailAndPassword(auth,email,password);
          const token=await userCredentials.user.getIdToken();
          localStorage.setItem("token",token);
          setLoading(false);
          navigate("/welcome");
        } catch (error) {
          setError("Invalid email or password");
          setLoading(false);
        }
    }
  return (
  <div className="login">
    <h2>🔐 Login Page</h2>
    {error&& <p style={{color:"red"}}>{error}</p>}
    <form onSubmit={handleSubmit} className="login-form">
        <input type="email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button type="submit" disabled={loading}>{loading ? "Logging In..." : "Login"}</button>
    </form>
    <p>Don't have an account?? <a href="/signup">Sign Up</a></p>
  </div>
);
}
export default Login;
