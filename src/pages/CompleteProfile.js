import { updateProfile } from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from '../firebase/Firebase';
import "../styles/CompleteProfile.css";

function CompleteProfile() {
    const[fullName,setFullName]=useState("");
    const[photoUrl,setPhotoUrl]=useState("");
    const[error,setError]=useState("");
    const[success,setSuccess]=useState("");

    const handleUpdate=async(e)=>{
        e.preventDefault();
        setError("");
        setSuccess("");

        if(!fullName || !photoUrl){
            setError("Both fields are required.");
        }
        try {
            await updateProfile(auth.currentUser,{
                displayName:fullName,
                photoURL:photoUrl,
            });
            setSuccess("Profile Successfully Updated.");
        } catch (error) {
            setError("Failed to update profile: "+error.message);
        }
    }
  return (
    <div className='profile-form-container'>
        <h2>Complete Profile</h2>
        <form onSubmit={handleUpdate}>
            <input type='text' placeholder='Full Name' value={fullName} onChange={(e)=>setFullName(e.target.value)}/>
            <input type='url' placeholder='Photo Url' value={photoUrl} onChange={(e)=>setPhotoUrl(e.target.value)}/>
            <button type='submit'>Update</button>
        </form>
        {error&& <p className='error-msg'>{error}</p>}
        {success&& <p className='success-msg'>{success}</p>}
    </div>
  )
}

export default CompleteProfile;