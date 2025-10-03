import React from "react";

const SplashNav = ({ setActiveForm }) => {
    return (
        <nav className="SplashNav">
            <header className="SplashNav">
                <div className="SplashNav-brand">
                    <img src="/assets/images/logo.png" alt="Repo River Logo" className="splash-logo" />
                </div>
                <div className="SplashNav-links">
                    <button
                        className="nav-link login-btn"
                        onClick={() => setActiveForm('login')}
                    >
                        Login
                    </button>
                    <button
                        className="nav-link signup-btn"
                        onClick={() => setActiveForm('signup')}
                    >
                        Sign Up
                    </button>
                </div>
            </header>
        </nav>
    );
};

export default SplashNav;