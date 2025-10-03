import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Project from "./pages/Project";
import Splash from "./pages/Splash";
import Discover from './pages/Discover';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Splash />} />
                <Route path="/splash" element={<Splash />} />
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/discover" element={<Discover />} />

                {/* Dynamic routes with IDs */}
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/project/:id" element={<Project />} />

                <Route path="/login" element={<div>Login Page</div>} />
                <Route path="/signup" element={<div>Sign Up Page</div>} />
            </Routes>
        </Router>
    );
};

export default App;