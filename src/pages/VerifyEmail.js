import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/Firebase';
import "../styles/VerifyEmail.css";

function VerifyEmail() {
    const[emailVerified,setEmailVerified]=useState(false);
    const[error,setError]=useState("");
    const[message,setMessage]=useState("");

    useEffect(()=>{
        const checkVerification=()=>{
            const user=auth.currentUser;
            if(user){
                user.reload().then(()=>{
                    setEmailVerified(user.emailVerified);
                })
            }
        }
        checkVerification();
    },[]);

    const sendVerificationEmail=async()=>{
        setError("");
        setMessage("");

        try{
        const idToken=await auth.currentUser.getIdToken();
        const response=await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBz9pJLB7LYeCh0DXfwMU2KgwvdbQArQuk",
            {
                method:"POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                requestType: 'VERIFY_EMAIL',
                idToken: idToken,
            })
    }
);

        const data=await response.json();
        if(data.error){
            setError(`Error: ${data.error.message}`);
        }
        else{
            setMessage(`✅ A verification email has been sent. Check your inbox.`);
        }
    }
    catch(error){
        setError("Failed to send verification email.");
    }
};

  return (
    <div className='verify-email-box'>
        {emailVerified ?(
            <p className='verified-msg'>✅ Your email is verified.</p>
        ):(
            <>
            <button onClick={sendVerificationEmail}>Verify Email</button>
            {message&& <p className='success-msg'>{message}</p>}
            {error&& <p className='error-msg'>{error}</p>}
            </>
        )}
    </div>
  )

}
export default VerifyEmail;