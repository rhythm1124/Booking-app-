import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/main_form.css';

const FormPage = () => {
    const [numTickets, setNumTickets] = useState(1);
    const [formData, setFormData] = useState({
        date: new Date(),
        time: '',
        tickets: 1,
        attendees: [{ firstName: '', lastName: '', email: '', phone: '' }],
    });
    const [currentSection, setCurrentSection] = useState(1);
    const navigate = useNavigate();

    const handleDateChange = (date) => {
        setFormData({
            ...formData,
            date,
        });
    };

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newAttendees = [...formData.attendees];
        newAttendees[index][name] = value;
        setFormData({ ...formData, attendees: newAttendees });
    };

    const handleTicketsChange = (increment) => {
        const newTicketCount = numTickets + increment;
        if (newTicketCount < 1) return;

        setNumTickets(newTicketCount);

        const newAttendees = Array.from({ length: newTicketCount }, (_, i) => (
            formData.attendees[i] || { firstName: '', lastName: '', email: '', phone: '' }
        ));
        setFormData({
            ...formData,
            tickets: newTicketCount,
            attendees: newAttendees,
        });
    };

    const validateSection1 = () => formData.date && formData.time && formData.tickets > 0;
    const validateSection2 = () => formData.attendees.every(attendee =>
        attendee.firstName && attendee.lastName && attendee.email && attendee.phone
    );

    const handleSaveAndNext = async () => {
        if (currentSection === 1 && !validateSection1()) {
            alert('Please fill in all fields.');
            return;
        }
        if (currentSection === 2 && !validateSection2()) {
            alert('Please fill in all attendee details.');
            return;
        }
        if (currentSection === 2) {
            try {
                const response = await fetch('http://localhost:5000/api/booking', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                if (response.ok) {
                    navigate('/confirmation', { state: { formData } });
                } else {
                    alert('Failed to save booking.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred.');
            }
        } else {
            setCurrentSection(currentSection + 1);
        }
    };

    return (
        <div className="form-page">
            {currentSection === 1 && (
                <div className="form-section">
                    <h2>Select Date, Time, and Tickets</h2>
                    <label htmlFor="date">Preferred Date:</label>
                    <DatePicker
                        selected={formData.date}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        className="date-input"
                    />
                    <label htmlFor="time">Preferred Time:</label>
                    <div className="time-slot-grid">
                        {['10:00', '12:00', '14:00', '16:00', '18:00'].map(time => (
                            <div
                                key={time}
                                className={`time-slot-button ${formData.time === time ? 'selected' : ''}`}
                                onClick={() => setFormData({ ...formData, time })}
                            >
                                {time}
                            </div>
                        ))}
                    </div>
                    <label htmlFor="tickets">Number of Tickets:</label>
                    <div className="ticket-controls">
                        <button onClick={() => handleTicketsChange(-1)} disabled={numTickets <= 1}>-</button>
                        <input type="text" value={numTickets} readOnly />
                        <button onClick={() => handleTicketsChange(1)}>+</button>
                    </div>
                </div>
            )}

            {currentSection === 2 && (
                <div className="form-section">
                    <h2>Enter Details</h2>
                    {formData.attendees.map((attendee, index) => (
                        <div key={index} className="input-group">
                            <div className="input-group-item">
                                <label htmlFor={`firstName-${index}`}>First Name:</label>
                                <input
                                    type="text"
                                    id={`firstName-${index}`}
                                    name="firstName"
                                    placeholder="First Name"
                                    value={attendee.firstName}
                                    onChange={(e) => handleInputChange(index, e)}
                                    required
                                />
                            </div>
                            <div className="input-group-item">
                                <label htmlFor={`lastName-${index}`}>Last Name:</label>
                                <input
                                    type="text"
                                    id={`lastName-${index}`}
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={attendee.lastName}
                                    onChange={(e) => handleInputChange(index, e)}
                                    required
                                />
                            </div>
                            <div className="input-group-item">
                                <label htmlFor={`email-${index}`}>Email:</label>
                                <input
                                    type="email"
                                    id={`email-${index}`}
                                    name="email"
                                    placeholder="Email"
                                    value={attendee.email}
                                    onChange={(e) => handleInputChange(index, e)}
                                    required
                                />
                            </div>
                            <div className="input-group-item">
                                <label htmlFor={`phone-${index}`}>Phone Number:</label>
                                <input
                                    type="tel"
                                    id={`phone-${index}`}
                                    name="phone"
                                    placeholder="Phone Number"
                                    value={attendee.phone}
                                    onChange={(e) => handleInputChange(index, e)}
                                    required
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="form-section">
                <button className="save-next-button" onClick={handleSaveAndNext}>
                    {currentSection === 2 ? 'Save and Next' : 'Next'}
                </button>
            </div>
        </div>
    );
};

export default FormPage;
