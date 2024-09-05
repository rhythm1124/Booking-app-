import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMovies } from '../apiService'; 

const MovieCatalog = ({ setFormData, formData }) => {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            const movies = await getMovies();
            setMovies(movies);
        };
        fetchMovies();
    }, []);

    const handleMovieSelect = (movie) => {
        setFormData({ ...formData, movie: movie.title });
        navigate('/form');
    };

    return (
        <div>
            <h1>Movie Catalog</h1>
            <ul>
                {movies.map(movie => (
                    <li key={movie._id} onClick={() => handleMovieSelect(movie)}>
                        {movie.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MovieCatalog;
