const express = require('express');
const cors = require('cors'); // Import CORS
const app = express();
const bodyParser = require('body-parser');

// Middleware to parse JSON data from the request body
app.use(bodyParser.json());

// POST route to handle booking submissions
app.post('/api/bookings', (req, res) => {
    const bookingData = req.body;

    // Check if the data is valid
    if (!bookingData || !bookingData.attendees || bookingData.attendees.length === 0) {
        return res.status(400).json({ message: 'Invalid booking data' });
    }

    // Simulate saving to the database
    console.log('Booking confirmed:', bookingData);

    // Respond with success
    res.status(200).json({ message: 'Booking confirmed successfully' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
