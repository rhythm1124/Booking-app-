import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const getMovies = async () => {
    const response = await axios.get(`${API_URL}/movies`);
    return response.data;
};

export const createMovie = async (movie) => {
    const response = await axios.post(`${API_URL}/movies`, movie);
    return response.data;
};

export const updateMovie = async (id, movie) => {
    const response = await axios.put(`${API_URL}/movies/${id}`, movie);
    return response.data;
};

export const deleteMovie = async (id) => {
    const response = await axios.delete(`${API_URL}/movies/${id}`);
    return response.data;
};
