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
            {/* <li><a href="profiles.html">Gardenrs</a></li> */}
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
        </ul>
    </nav>
</div>
 )
}

export default Navbar