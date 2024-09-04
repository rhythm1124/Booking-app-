import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // To navigate to the confirmation page
import '../styles/main_form.css';

const timeSlots = [
    "09:00 AM",
    "11:00 AM",
    "01:00 PM",
    "03:00 PM",
    "05:00 PM",
    "07:00 PM",
    "09:00 PM"
];

const FormPage = () => {
    const [currentSection, setCurrentSection] = useState(1);
    const [numTickets, setNumTickets] = useState(1);
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        tickets: 1,
        attendees: [{ firstName: '', lastName: '', email: '', phone: '' }],
    });

    const navigate = useNavigate();

    // Handle change in form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle ticket details change
    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newAttendees = [...formData.attendees];
        newAttendees[index][name] = value;
        setFormData({ ...formData, attendees: newAttendees });
    };

    const handleTicketsChange = (event) => {
        const newTicketCount = parseInt(event.target.value);
        setNumTickets(newTicketCount);
        setFormData({
            ...formData,
            tickets: newTicketCount,
            attendees: Array(newTicketCount).fill({ firstName: '', lastName: '', email: '', phone: '' }),
        });
    };

    // Increment and decrement functions for tickets
    const incrementTickets = () => {
        setNumTickets(prev => {
            const newCount = prev + 1;
            setFormData({
                ...formData,
                tickets: newCount,
                attendees: Array(newCount).fill({ firstName: '', lastName: '', email: '', phone: '' }),
            });
            return newCount;
        });
    };

    const decrementTickets = () => {
        setNumTickets(prev => {
            if (prev > 1) {
                const newCount = prev - 1;
                setFormData({
                    ...formData,
                    tickets: newCount,
                    attendees: Array(newCount).fill({ firstName: '', lastName: '', email: '', phone: '' }),
                });
                return newCount;
            }
            return prev;
        });
    };

    const handleNext = () => {
        if (validateCurrentSection()) {
            setCurrentSection(currentSection + 1);
        }
    };

    const validateCurrentSection = () => {
        if (currentSection === 1) {
            return formData.date && formData.time && formData.tickets;
        } else if (currentSection === 2) {
            return formData.attendees.every(attendee =>
                attendee.firstName && attendee.lastName && attendee.email && attendee.phone
            );
        }
        return true;
    };

    const handleSaveAndNext = () => {
        if (validateCurrentSection()) {
            navigate('/confirmation');
        }
    };

    return (
        <div className="form-page">
            <h1>Book Your Show/Movie</h1>

            {currentSection === 1 && (
                <div className="form-section">
                    <h2>Select Date, Time, and Tickets</h2>
                    <label htmlFor="date">Preferred Date:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="time">Preferred Time Slot:</label>
                    <div className="time-slot-grid">
                        {timeSlots.map((slot, index) => (
                            <button
                                key={index}
                                className={`time-slot-button ${formData.time === slot ? 'selected' : ''}`}
                                onClick={() => setFormData({ ...formData, time: slot })}
                            >
                                {slot}
                            </button>
                        ))}
                    </div>

                    <label htmlFor="tickets">Number of Tickets:</label>
                    <div className="ticket-controls">
                        <button className="ticket-button" onClick={decrementTickets}>-</button>
                        <input
                            type="text"
                            id="tickets"
                            name="tickets"
                            value={numTickets}
                            readOnly
                            className="ticket-input"
                        />
                        <button className="ticket-button" onClick={incrementTickets}>+</button>
                    </div>

                    <button
                        className="save-next-button"
                        onClick={handleNext}
                        disabled={!validateCurrentSection()}
                    >
                        Next
                    </button>
                </div>
            )}

            {currentSection === 2 && (
                <div className="form-section">
                    <h2>Enter Attendee Details</h2>
                    {Array.from({ length: numTickets }).map((_, index) => (
                        <div key={index} className="attendee-details">
                            <h3>Attendee {index + 1}</h3>
                            <label htmlFor={`firstName-${index}`}>First Name:</label>
                            <input
                                type="text"
                                id={`firstName-${index}`}
                                name="firstName"
                                value={formData.attendees[index]?.firstName || ''}
                                onChange={(e) => handleInputChange(index, e)}
                                required
                            />

                            <label htmlFor={`lastName-${index}`}>Last Name:</label>
                            <input
                                type="text"
                                id={`lastName-${index}`}
                                name="lastName"
                                value={formData.attendees[index]?.lastName || ''}
                                onChange={(e) => handleInputChange(index, e)}
                                required
                            />

                            <label htmlFor={`email-${index}`}>Email:</label>
                            <input
                                type="email"
                                id={`email-${index}`}
                                name="email"
                                value={formData.attendees[index]?.email || ''}
                                onChange={(e) => handleInputChange(index, e)}
                                required
                            />

                            <label htmlFor={`phone-${index}`}>Phone Number:</label>
                            <input
                                type="tel"
                                id={`phone-${index}`}
                                name="phone"
                                value={formData.attendees[index]?.phone || ''}
                                onChange={(e) => handleInputChange(index, e)}
                                required
                            />
                        </div>
                    ))}
                    <button
                        className="save-next-button"
                        onClick={handleNext}
                        disabled={!validateCurrentSection()}
                    >
                        Next
                    </button>
                </div>
            )}

            {currentSection === 3 && (
                <div className="form-section">
                    <button
                        className="save-next-button"
                        onClick={handleSaveAndNext}
                        disabled={!validateCurrentSection()}
                    >
                        Save and Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default FormPage;
