import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/sidecontainer.css';

const SideContainer = () => {
    return (
        <div className="side-container">
            <ul>
                <li><Link to="/">1</Link></li> {/* Main page */}
                <li><Link to="/form">2</Link></li> {/* Form page */}
                <li><Link to="/confirmation">3</Link></li> {/* Confirmation page */}
            </ul>
        </div>
    );
}

export default SideContainer;
