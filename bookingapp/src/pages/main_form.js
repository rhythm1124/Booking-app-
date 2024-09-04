import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // To navigate to confirmation page
import DatePicker from 'react-datepicker'; // Import your date picker component
import 'react-datepicker/dist/react-datepicker.css'; // Import date picker styles
import '../styles/main_form.css';

const FormPage = () => {
    const [numTickets, setNumTickets] = useState(1);
    const [formData, setFormData] = useState({
        date: new Date(),
        time: '',
        tickets: 1,
        attendees: [{ firstName: '', lastName: '', email: '', phone: '' }],
    });
    const [currentSection, setCurrentSection] = useState(1); // Track the current section
    const navigate = useNavigate();

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

    const validateSection1 = () => {
        return formData.date && formData.time && formData.tickets > 0;
    };

    const validateSection2 = () => {
        return formData.attendees.every(attendee =>
            attendee.firstName && attendee.lastName && attendee.email && attendee.phone
        );
    };

    const handleSaveAndNext = () => {
        if (currentSection === 1 && !validateSection1()) {
            alert('Please fill in all fields in the current section.');
            return;
        }

        if (currentSection === 2 && !validateSection2()) {
            alert('Please fill in all attendee details.');
            return;
        }

        if (currentSection === 2) {
            // Proceed to confirmation page
            console.log('Form data:', formData);
            navigate('/confirmation');
        } else {
            // Move to the next section
            setCurrentSection(currentSection + 1);
        }
    };

    return (
        <div className="form-page">

            {/* Section 1: Date, Time, and Tickets */}
            {currentSection === 1 && (
                <div className="form-section">
                    <h2>Select Date, Time, and Tickets</h2>
                    <label htmlFor="date">Preferred Date:</label>
                    <DatePicker
                        selected={formData.date}
                        onChange={(date) => setFormData({ ...formData, date })}
                        dateFormat="yyyy/MM/dd"
                        className="date-input"
                        placeholderText="Select date"
                    />
                    <input
                        type="text"
                        value={formData.date.toISOString().substring(0, 10)}
                        onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value) })}
                        className="manual-date-input"
                        placeholder="YYYY-MM-DD"
                    />

                    <label htmlFor="time">Preferred Time:</label>
                    <div className="time-slot-grid">
                        {/* Example time slots */}
                        <div className={`time-slot-button ${formData.time === '10:00' ? 'selected' : ''}`} onClick={() => setFormData({ ...formData, time: '10:00' })}>10:00</div>
                        <div className={`time-slot-button ${formData.time === '12:00' ? 'selected' : ''}`} onClick={() => setFormData({ ...formData, time: '12:00' })}>12:00</div>
                        <div className={`time-slot-button ${formData.time === '14:00' ? 'selected' : ''}`} onClick={() => setFormData({ ...formData, time: '14:00' })}>14:00</div>
                        <div className={`time-slot-button ${formData.time === '16:00' ? 'selected' : ''}`} onClick={() => setFormData({ ...formData, time: '16:00' })}>16:00</div>
                        <div className={`time-slot-button ${formData.time === '18:00' ? 'selected' : ''}`} onClick={() => setFormData({ ...formData, time: '18:00' })}>18:00</div>
                    </div>

                    <label htmlFor="tickets">Number of Tickets:</label>
                    <div className="ticket-controls">
                        <button className="ticket-button" onClick={() => setNumTickets(numTickets - 1)} disabled={numTickets <= 1}>-</button>
                        <input type="text" className="ticket-input" value={numTickets} readOnly />
                        <button className="ticket-button" onClick={() => setNumTickets(numTickets + 1)}>+</button>
                    </div>
                </div>
            )}

            {/* Section 2: Attendee Details */}
            {currentSection === 2 && (
                <div className="form-section">
                    <h2>Enter Attendee Details</h2>
                    {Array.from({ length: numTickets }).map((_, index) => (
                        <div key={index} className="attendee-details">
                            <h3>Attendee {index + 1}</h3>
                            <label htmlFor={`firstName-${index}`}>First Name:</label>
                            <input type="text" id={`firstName-${index}`} name="firstName" value={formData.attendees[index]?.firstName || ''} onChange={(e) => handleInputChange(index, e)} required />

                            <label htmlFor={`lastName-${index}`}>Last Name:</label>
                            <input type="text" id={`lastName-${index}`} name="lastName" value={formData.attendees[index]?.lastName || ''} onChange={(e) => handleInputChange(index, e)} required />

                            <label htmlFor={`email-${index}`}>Email:</label>
                            <input type="email" id={`email-${index}`} name="email" value={formData.attendees[index]?.email || ''} onChange={(e) => handleInputChange(index, e)} required />

                            <label htmlFor={`phone-${index}`}>Phone Number:</label>
                            <input type="tel" id={`phone-${index}`} name="phone" value={formData.attendees[index]?.phone || ''} onChange={(e) => handleInputChange(index, e)} required />
                        </div>
                    ))}
                </div>
            )}

            {/* Section 3: Save and Next */}
            <div className="form-section">
                <button className="save-next-button" onClick={handleSaveAndNext}>
                    {currentSection === 2 ? 'Save and Next' : 'Next'}
                </button>
            </div>
        </div>
    );
};

export default FormPage;
