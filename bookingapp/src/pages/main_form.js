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
        setNumTickets(newTicketCount);
        setFormData({
            ...formData,
            tickets: newTicketCount,
            attendees: Array(newTicketCount).fill({ firstName: '', lastName: '', email: '', phone: '' }),
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
            {/* Sections for form inputs */}
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
                    {Array.from({ length: numTickets }).map((_, index) => (
                        <div key={index} className="attendee-details">
                            <h3>Ticket {index + 1}</h3>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.attendees[index].firstName || ''}
                                onChange={(e) => handleInputChange(index, e)}
                                required
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.attendees[index].lastName || ''}
                                onChange={(e) => handleInputChange(index, e)}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.attendees[index].email || ''}
                                onChange={(e) => handleInputChange(index, e)}
                                required
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.attendees[index].phone || ''}
                                onChange={(e) => handleInputChange(index, e)}
                                required
                            />
                        </div>
                    ))}
                </div>
            )}

            <div className="form-section">
                <button onClick={handleSaveAndNext}>
                    {currentSection === 2 ? 'Save and Next' : 'Next'}
                </button>
            </div>
        </div>
    );
};

export default FormPage;
