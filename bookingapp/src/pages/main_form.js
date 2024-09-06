import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/main_form.css';

const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

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
        if (newTicketCount < 1) return; // Prevent negative tickets

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

    const handleSaveAndNext = () => {
        if (currentSection === 1 && !validateSection1()) {
            alert('Please fill in all fields.');
            return;
        }
        if (currentSection === 2 && !validateSection2()) {
            alert('Please fill in all attendee details.');
            return;
        }
        if (currentSection === 2) {
            navigate('/confirmation', { state: { formData } });
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
                        <button className="ticket-button" onClick={() => handleTicketsChange(-1)} disabled={numTickets <= 1}>-</button>
                        <input className="ticket-input" type="text" value={numTickets} readOnly />
                        <button className="ticket-button" onClick={() => handleTicketsChange(1)}>+</button>
                    </div>
                </div>
            )}

            {currentSection === 2 && (
                <div className="form-section">
                    <h2>Enter Details</h2>
                    {formData.attendees.map((attendee, index) => (
                        <div key={index} className="attendee-details">
                            <h3>Ticket {index + 1}</h3>
                            <div className="input-group">
                                <div className="input-group-item">
                                    <label htmlFor={`firstName-${index}`}>First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        id={`firstName-${index}`}
                                        value={attendee.firstName}
                                        onChange={(e) => handleInputChange(index, e)}
                                        required
                                    />
                                </div>
                                <div className="input-group-item">
                                    <label htmlFor={`lastName-${index}`}>Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        id={`lastName-${index}`}
                                        value={attendee.lastName}
                                        onChange={(e) => handleInputChange(index, e)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="input-group">
                                <div className="input-group-item">
                                    <label htmlFor={`email-${index}`}>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id={`email-${index}`}
                                        value={attendee.email}
                                        onChange={(e) => handleInputChange(index, e)}
                                        required
                                    />
                                </div>
                                <div className="input-group-item">
                                    <label htmlFor={`phone-${index}`}>Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        id={`phone-${index}`}
                                        value={attendee.phone}
                                        onChange={(e) => handleInputChange(index, e)}
                                        required
                                    />
                                </div>
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
