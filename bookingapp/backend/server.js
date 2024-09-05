const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/bookingapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Routes
const movieRoutes = require('./routes/movieRoutes');
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

app.use('/movies', movieRoutes);
app.use('/users', userRoutes);
app.use('/bookings', bookingRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
