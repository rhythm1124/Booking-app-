import React, { useState } from 'react';
import '../styles/sidecontainer.css';

const SideContainer = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div className="hamburger" onClick={toggleMenu}>
                &#9776; {/* Unicode for the hamburger icon */}
            </div>
            <div className={`side-container ${isOpen ? 'show' : ''}`}>
                <ul>
                    <li><a href="#details">Details</a></li>
                    <li><a href="#event">Event</a></li>
                    <li><a href="#confirm">Confirm</a></li>
                </ul>
            </div>
        </div>
    );
}

export default SideContainer;
