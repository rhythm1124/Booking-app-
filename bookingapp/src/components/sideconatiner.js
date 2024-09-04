import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation for current path

const SideContainer = () => {
    const location = useLocation(); // Get the current route

    return (
        <div className="side-container">
            <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>1</Link>
            <Link to="/form" className={`nav-item ${location.pathname === '/form' ? 'active' : ''}`}>2</Link>
            <Link to="/confirmation" className={`nav-item ${location.pathname === '/confirmation' ? 'active' : ''}`}>3</Link>
        </div>
    );
};

export default SideContainer;
