import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/main_page.css';
import poster1 from '../assets/url_to_poster_1.jpg';
import poster2 from '../assets/url_to_poster_2.jpg';
import poster3 from '../assets/url_to_poster_3.jpg';
import poster4 from '../assets/url_to_poster_4.jpg';
import poster5 from '../assets/url_to_poster_5.jpg';
import poster6 from '../assets/url_to_poster_6.jpg';
import poster7 from '../assets/url_to_poster_7.jpg';
import poster8 from '../assets/url_to_poster_8.jpg';
import poster9 from '../assets/url_to_poster_9.jpg';

const movies = [
    { name: 'Avengers', poster: poster1 },
    { name: 'Star Wars', poster: poster2 },
    { name: 'Shrek', poster: poster3 },
    { name: 'Stree 2', poster: poster4 },
    { name: '83', poster: poster5 },
    { name: 'Deadpool X Wolverine', poster: poster6 },
    { name: 'Jab We Met', poster: poster7 },
    { name: 'Yeh Jaavani Hai Deewani', poster: poster8 },
    { name: 'Tamasha', poster: poster9 }
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
