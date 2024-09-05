import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/navbar';
import SideContainer from './components/sideconatiner';
import MainPage from './pages/main_page';
import FormPage from './pages/main_form';
import ConfirmationPage from './pages/main_confirm';
import MovieCatalog from './components/MovieCatalog';
import './styles/main.css';

const App = () => {
    return (
        <Router>
            <NavBar />
            <SideContainer />
            <div className="content">
                <Routes>
                    <Route path="/movies" element={<MovieCatalog />} />
                    <Route path="/" element={<MainPage />} />
                    <Route path="/form" element={<FormPage />} />
                    <Route path="/confirmation" element={<ConfirmationPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
