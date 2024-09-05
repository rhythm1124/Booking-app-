import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/navbar';
import SideContainer from './components/sideconatiner';
import MainPage from './pages/main_page';
import FormPage from './pages/main_form';
import ConfirmationPage from './pages/main_confirm';
import MovieCatalog from './components/MovieCatalog';
import './styles/main.css';

const App = () => {
    const [formData, setFormData] = useState({
        movie: '',
        date: '',
        timeSlot: '',
        tickets: 1,
        userDetails: [{ firstName: '', lastName: '', email: '', phone: '' }]
    });

    return (
        <Router>
            <NavBar />
            <SideContainer />
            <div className="content">
                <Routes>
                    <Route path="/movies" element={<MovieCatalog setFormData={setFormData} formData={formData} />} />
                    <Route path="/" element={<MainPage setFormData={setFormData} formData={formData} />} />
                    <Route path="/form" element={<FormPage setFormData={setFormData} formData={formData} />} />
                    <Route path="/confirmation" element={<ConfirmationPage formData={formData} setFormData={setFormData} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
