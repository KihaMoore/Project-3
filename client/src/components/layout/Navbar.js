import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
 return (
<div>
    <nav className="navbar">
        <h1>
            <Link to='/'>Seed</Link>
        </h1>
        <ul>
            <Link to="/dashboard">Gardenrs</Link> 
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
        </ul>
    </nav>
</div>
 )
}

export default Navbar