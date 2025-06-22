import { useState } from "react";
import { auth } from "../firebase/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../styles/SignUp.css";

function SignUp() {
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[confirmPassword,setConfirmPassword]=useState("");
    const[success,setSuccess]=useState("");
    const[error,setError]=useState("");
    const[loading,setLoading]=useState(false);
    const navigate=useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setError("");
        setSuccess("");

        if(password!==confirmPassword){
            setError("passworda do not match");
            return;
        }
        if(!email || !password || !confirmPassword){
            setError("All fields are required!");
            return;
        }

        try {
            setLoading(true);
            await createUserWithEmailAndPassword(auth,email,password);
            setSuccess("Sign up successful! Redirecting to login...");
            setTimeout(()=>{
                navigate("/login");
            },2000)
        } catch (error) {
            setError("Error : "+error.message);
        }
          finally{
            setLoading(false);
        }
    }
  return (
  <div className="sign-up">
    <h2>📝 Sign Up Page</h2>
    {error&& <p style={{color:"red"}}>{error}</p>}
    {success&& <p style={{color:"green"}}>{success}</p>}
    <form onSubmit={handleSubmit}>
        <input type="email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <input type="password" placeholder="confirm password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
        <button type="submit" disabled={loading}>{loading ? "Signing Up..." :"Sign Up"}</button>
    </form>
  </div>);
}
export default SignUp;
