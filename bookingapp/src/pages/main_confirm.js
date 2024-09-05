import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/main_confirm.css';

const ConfirmationPage = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { formData } = state || {};

    if (!formData) {
        return <p>No booking details available.</p>;
    }

    const handleEdit = () => {
        navigate('/form', { state: { formData } });
    };

    return (
        <div className="confirmation-page">
            <br/><br/><br/>
            <div className="booking-details">
                <p><strong>Date:</strong> {formData.date.toLocaleDateString()}</p>
                <p><strong>Time:</strong> {formData.time}</p>
                <p><strong>Tickets:</strong> {formData.tickets}</p>
                {formData.attendees.map((attendee, index) => (
                    <div key={index} className="attendee-info">
                        <p><strong>Ticket {index + 1}</strong></p>
                        <p><strong>First Name:</strong> {attendee.firstName}</p>
                        <p><strong>Last Name:</strong> {attendee.lastName}</p>
                        <p><strong>Email:</strong> {attendee.email}</p>
                        <p><strong>Phone:</strong> {attendee.phone}</p>
                    </div>
                ))}
            </div>
            <button className="edit-button" onClick={handleEdit}>Edit</button>
            <button className="confirm-button">Confirm Booking</button>
        </div>
    );
};

export default ConfirmationPage;
