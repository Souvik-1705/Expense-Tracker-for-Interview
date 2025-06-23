import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/Firebase'; 
import "../styles/ForgotPassword.css";

function ForgotPassword() {
    const[email,setEmail]=useState("");
    const[message,setMessage]=useState("");
    const[error,setError]=useState("");
    const[loading,setLoading]=useState(false);

    const handleReset=async(e)=>{
        e.preventDefault();
        setLoading(true);
        setError("");
        setEmail("");
        setMessage("");

        try {
            await sendPasswordResetEmail(auth,email);
            setMessage("✅ Password reset link has been sent to your email.");
        } catch (error) {
              setError("❌ Failed to send reset email. " + error.message);
        }
        finally{
            setLoading(false);
        }
    }
  return (
    <div className='forgot-password'>
        <h2>Forgot Password</h2>
        <form onSubmit={handleReset}>
            <input type='email' value={email} placeholder='Email' onChange={(e)=>setEmail(e.target.value)} required/>
            <button type='submit' disabled={loading}>{loading ? "Sending..." : "Send Reset Link"}</button>
        </form>
        {message&& <p className='success-msg'>{message}</p>}
        {error&& <p className='error-msg'>{error}</p>}
    </div>
  )
}

export default ForgotPassword;