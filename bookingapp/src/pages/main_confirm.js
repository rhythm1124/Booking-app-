import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/main_confirm.css';

const ConfirmationPage = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { formData } = state || {};
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!formData) {
        return <p>No booking details available.</p>;
    }

    const handleEdit = () => {
        navigate('/form', { state: { formData } });
    };

    const handleConfirm = async () => {
        try {
            // Send a POST request to the backend
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Send the form data to the backend
            });
    
            // Check if the response is OK
            if (!response.ok) {
                throw new Error('Failed to confirm booking. Please try again.');
            }
    
            const data = await response.json();
    
            // Alert the user with the success message from the backend
            alert(data.message);
    
            // Navigate to a success page (or handle success accordingly)
            navigate('/confirmation-success'); // Optional
        } catch (error) {
            alert('Booking not confirmed: ' + error.message);
        }
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
                        <p><strong>Ticket {index + 1}:</strong> {attendee.firstName} {attendee.lastName}</p>
                        <p><strong>Email:</strong> {attendee.email}</p>
                        <p><strong>Phone:</strong> {attendee.phone}</p>
                    </div>
                ))}
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button className="edit-button" onClick={handleEdit} disabled={loading}>
                {loading ? 'Loading...' : 'Edit'}
            </button>
            <button className="confirm-button" onClick={handleConfirm} disabled={loading}>
                {loading ? 'Loading...' : 'Confirm'}
            </button>
        </div>
    );
};

export default ConfirmationPage;
