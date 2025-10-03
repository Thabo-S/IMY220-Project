import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import SplashNav from "../components/SplashNav";
// import { projects } from "../data"
import ProjectPreview from "../components/ProjectPreview"
import  Footer from "../components/Footer";

const Splash = () => {
    const [activeForm, setActiveForm] = useState(null);
    const navigate = useNavigate();
    const [topProjects, setTopProjects] = useState([]);

useEffect(() => {
    const fetchTopProjects = async () => {
        try{
            const response = await fetch('/api/activity/global');
            if(!response.ok){
                throw new Error('Failed to fetch top projects');
            }
            const data = await response.json();
            console.log("API Response:", data);
            console.log("First project:", data[0]);
            setTopProjects(data.slice(0,3));
        }catch(error){
            console.log("Error fetching top projects: ", error);
        }
    };
    fetchTopProjects();
},[]);

    const handleLogin = async (credentials) => {
        try{
            const response = await fetch(`/api/auth/login`,{
                method: `POST`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(credentials),
            });
            const data = await response.json();

            if(data.success){
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('token', data.token);

                console.log('Login successful:',data);
                setActiveForm(null);
                navigate('/home');
            }else{
                console.log('Login failed: ' + data.message);
            }
        }catch(error){
            console.log('Login error: ',error);
            
        }
    };
    

    const handleSignUp = async (userData) => {
        try{
            const response = await fetch(`/api/auth/signup`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if(data.success){
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('token', data.token);

                console.log('Signup successful:', data);
                setActiveForm(null);
                navigate('/home');
            }else{
                console.log('Signup failed: ' + data.message);
            }
        }catch(error){
            console.error('Signup error:',error);
        }
    };

    return (
        <div className="splash-container">
            <SplashNav setActiveForm={setActiveForm} />

            <main className="splash">
                <div className="splash-content">
                    <h1 className="splash-tagline">
                        Repo River is your flowing hub for seamless version control and collaboration
                    </h1>

                    <div className="splash-features">
                        <div className="feature-card">
                            <img src="/assets/images/connected-icon.png" alt="Network Icon" className="feature-icon" />
                            <p>Manage projects, track changes, and connect with developers in real-time</p>
                        </div>

                        <div className="feature-card">
                            <img src="/assets/images/code-icon.png" alt="Code Icon" className="feature-icon" />
                            <p>Streamline your coding workflow with a simple, secure, and collaborative platform</p>
                        </div>
                    </div>

                    {/* Forms overlay */}
                    {activeForm && (
                        <div className="form-overlay">
                            <div className="form-container">
                                {activeForm === 'login' ? (
                                    <LoginForm onLogin={handleLogin} />
                                ) : (
                                    <SignUpForm onSignUp={handleSignUp} />
                                )}
                                <button
                                    className="close-form"
                                    onClick={() => setActiveForm(null)}
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="splash-cta">
                    <h2>Start Your Coding Journey Today</h2>
                    <div className="cta-buttons">
                        <button className="cta-button primary" onClick={() => setActiveForm('signup')}>
                            Get Started
                        </button>
                        <button className="cta-button secondary" onClick={() => setActiveForm('login')}>
                            Sign In
                        </button>
                    </div>
                </div>

                <div className="project-previews">
                    {topProjects.slice(0,3).map((project, index) => (
                        <div  key={index}>
                            <ProjectPreview project={project}/> 
                        </div>
                    ))}
                </div>
            </main>
            
            <Footer/>
        </div>
    );
};

export default Splash;