import React from 'react';
import '../styles/sidecontainer.css';

const SideContainer = () => {
    return (
        <div className="side-container">
            <ul>
                <li><a href="#details">Details</a></li>
                <li><a href="#event">Event</a></li>
                <li><a href="#confirm">Confirm</a></li>
            </ul>
        </div>
    );
}

export default SideContainer;
