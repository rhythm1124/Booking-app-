// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();

// // Middleware to parse JSON request bodies
// app.use(bodyParser.json());

// // POST route to handle booking submissions
// app.post('/api/bookings', (req, res) => {
//     const bookingData = req.body;

//     // Validate the data
//     if (!bookingData || !bookingData.attendees || bookingData.attendees.length === 0) {
//         return res.status(400).json({ message: 'Booking data is invalid' });
//     }

//     // Simulate saving to the database
//     console.log('Booking confirmed:', bookingData);

//     // Respond with a success message
//     res.status(200).json({ message: 'Booking confirmed successfully' });
// });

// // Serve frontend files (React app)
// app.use(express.static('public')); // Adjust this if you serve your React app differently

// // Start the server
// const PORT = process.env.PORT || 3000;  // Use the same port
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
