import React from 'react';
import '../styles/navbar.css';

const NavBar = () => {
    return (
        <nav className="navbar"> {/* Corrected the typo from "classNmae" to "className" */}
            <div className="navbar-title">Title</div>
            <div className="navbar-user">User</div>
        </nav>
    );
}

export default NavBar;
