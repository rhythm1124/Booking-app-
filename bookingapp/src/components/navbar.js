import React, { useState } from 'react';
import '../styles/navbar.css';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-title">Title</div>
            <div className="navbar-user">User</div>
            <div className="navbar-hamburger" onClick={toggleMenu}>
                &#9776; {/* Unicode for the hamburger icon */}
            </div>
            {/* Menu dropdown */}
            <div className={`side-menu ${isOpen ? 'show' : ''}`}>
                <ul>
                    <li><a href="/">Details</a></li>
                    <li><a href="/form">Event</a></li>
                    <li><a href="/confirmation">Confirm</a></li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;
