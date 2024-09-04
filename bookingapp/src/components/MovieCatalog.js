import React, { useState, useEffect } from 'react';
import { getMovies, createMovie, updateMovie, deleteMovie } from '../apiService'; // Adjust the path to apiService

const MovieCatalog = () => {
    const [movies, setMovies] = useState([]);
    const [newMovie, setNewMovie] = useState({ title: '', description: '', releaseDate: '' });

    useEffect(() => {
        const fetchMovies = async () => {
            const movies = await getMovies();
            setMovies(movies);
        };
        fetchMovies();
    }, []);

    const handleCreateMovie = async () => {
        const movie = await createMovie(newMovie);
        setMovies([...movies, movie]);
    };

    const handleUpdateMovie = async (id) => {
        const updatedMovie = { ...newMovie, title: 'Updated Title' }; // Example update
        const movie = await updateMovie(id, updatedMovie);
        setMovies(movies.map(m => (m._id === id ? movie : m)));
    };

    const handleDeleteMovie = async (id) => {
        await deleteMovie(id);
        setMovies(movies.filter(m => m._id !== id));
    };

    return (
        <div>
            <h1>Movie Catalog</h1>
            {/* Display movies and form to add new movie */}
            <form onSubmit={(e) => { e.preventDefault(); handleCreateMovie(); }}>
                <input
                    type="text"
                    placeholder="Title"
                    value={newMovie.title}
                    onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newMovie.description}
                    onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
                />
                <input
                    type="date"
                    placeholder="Release Date"
                    value={newMovie.releaseDate}
                    onChange={(e) => setNewMovie({ ...newMovie, releaseDate: e.target.value })}
                />
                <button type="submit">Add Movie</button>
            </form>
            <ul>
                {movies.map(movie => (
                    <li key={movie._id}>
                        {movie.title} - {movie.description} - {movie.releaseDate}
                        <button onClick={() => handleUpdateMovie(movie._id)}>Update</button>
                        <button onClick={() => handleDeleteMovie(movie._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MovieCatalog;
