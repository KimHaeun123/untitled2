import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './home';
import About from './about';
import Navbar from './navbar';
import './App.css';
import PrivacyPolicy from './PrivacyPolicy';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/privacy-policy" Component={PrivacyPolicy} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
