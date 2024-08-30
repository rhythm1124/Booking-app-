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
                <h1>Book Your Show/Movie</h1>
                <form className="booking-form">
                    <label htmlFor="name">Full Name:</label>
                    <input type="text" id="name" name="name" required />

                    <label htmlFor="email">Email Address:</label>
                    <input type="email" id="email" name="email" required />

                    <label htmlFor="phone">Phone Number:</label>
                    <input type="tel" id="phone" name="phone" required />

                    <label htmlFor="date">Preferred Date:</label>
                    <input type="date" id="date" name="date" required />

                    <label htmlFor="time">Preferred Time:</label>
                    <input type="time" id="time" name="time" required />

                    <label htmlFor="tickets">Number of Tickets:</label>
                    <input type="number" id="tickets" name="tickets" min="1" required />

                    <button type="submit">Book Now</button>
                </form>
            </div>
        </div>
    );
}

export default Form;
