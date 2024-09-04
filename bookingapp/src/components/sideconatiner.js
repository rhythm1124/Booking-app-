import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/sidecontainer.css';

const SideContainer = () => {
    const location = useLocation();
    const path = location.pathname;

    return (
        <div className="side-container">
            <ul>
                <li className={path === '/' ? 'active' : ''}>
                    <Link to="/">1</Link>
                </li>
                <li className={path === '/form' ? 'active' : ''}>
                    <Link to="/form">2</Link>
                </li>
                <li className={path === '/confirmation' ? 'active' : ''}>
                    <Link to="/confirmation">3</Link>
                </li>
            </ul>
        </div>
    );
}

export default SideContainer;
