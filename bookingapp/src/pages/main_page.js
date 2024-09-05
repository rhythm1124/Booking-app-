import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/main_page.css';

const movies = [
    { name: 'Movie 1', poster: 'url_to_poster_1.jpg' },
    { name: 'Movie 2', poster: 'url_to_poster_2.jpg' },
    { name: 'Movie 3', poster: 'url_to_poster_3.jpg' },
    { name: 'Movie 4', poster: 'url_to_poster_4.jpg' },
    { name: 'Movie 5', poster: 'url_to_poster_5.jpg' },
    { name: 'Movie 6', poster: 'url_to_poster_6.jpg' },
    { name: 'Movie 7', poster: 'url_to_poster_7.jpg' },
    { name: 'Movie 8', poster: 'url_to_poster_8.jpg' },
    { name: 'Movie 9', poster: 'url_to_poster_9.jpg' }
];

const MainPage = () => {
    const navigate = useNavigate();

    const handleMovieClick = () => {
        navigate('/form');
    };

    return (
        <div className="main-content">
            <div className="catalog">
                {movies.map((movie, index) => (
                    <div 
                        key={index} 
                        className="movie-item" 
                        onClick={handleMovieClick} 
                        style={{ backgroundImage: `url(${movie.poster})` }}
                    >
                        <span>{movie.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MainPage;
