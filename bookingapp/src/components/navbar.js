import React from 'react';
import '../styles/navbar.css';

const NavBar = () => {
    return (
        <nav classNmae="navbar">
        <div className="navbar-title">
            <ul><li>Title</li></ul>
        </div>
        <div className="navbar-user">
            <ul>
                <li>User</li>
            </ul>
        </div>
        </nav>
    );
}

export default NavBar;