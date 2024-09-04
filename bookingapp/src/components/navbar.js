import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/navbar.css';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Map current path to page title
    const getPageTitle = () => {
        switch (location.pathname) {
            case '/':
                return 'Select Movie';
            case '/form':
                return 'Details';
            case '/confirmation':
                return 'Confirm';
            default:
                return 'Title';
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-title">{getPageTitle()}</div>
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
