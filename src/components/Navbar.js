import React from 'react'
import { Link } from 'react-router-dom';
import "../styles/Navbar.css";

function Navbar() {
  return (
    <div className='navbar'>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Login</Link>
    </div>
  )
}

export default Navbar;