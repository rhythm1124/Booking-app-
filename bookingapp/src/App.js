import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './pages/main_form';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Form />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
