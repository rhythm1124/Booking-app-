const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

// Get all movies
router.get('/', async (req, res) => {
    const movies = await Movie.find();
    res.json(movies);
});

// Create a movie
router.post('/', async (req, res) => {
    const movie = new Movie(req.body);
    await movie.save();
    res.json(movie);
});

// Update a movie
router.put('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(movie);
});

// Delete a movie
router.delete('/:id', async (req, res) => {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: 'Movie deleted' });
});

module.exports = router;
