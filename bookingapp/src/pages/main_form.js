import React from 'react';
import NavBar from '../components/navbar';   // Import the NavBar component
import SideContainer from '../components/sideconatiner';  // Import the SideContainer component
import '../styles/main_form.css';

const Form = () => {
    return (
        <div>
            <NavBar /> {/* Add the NavBar component here */}
            <SideContainer /> {/* Add the SideContainer component here */}
            <div className="main-content">
                <h1>Main Form Details</h1>
                <ul className="color-theme">
                    <li id="a">Cool Blue</li>
                    <li id="b">Light Greyish</li>
                    <li id="c">Macadamia</li>
                    <li id="d">Redwood</li>
                    <li id="e">Burnt Under</li>
                </ul>
            </div>
        </div>
    );
}

export default Form;
