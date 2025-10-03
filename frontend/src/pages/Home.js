import React, { useState, useEffect } from "react";
import Feed from "../components/Feed";
import SearchInput from "../components/SearchInput";
import Navbar from "../components/Navbar";
import Filters from "../components/filters";
import Footer from "../components/Footer";
import PalmTree from "../components/PalmTree";
import ProjectList from "../components/ProjectList";

const Home = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchType, setSearchType] = useState("projects");
    const [filters, setFilters] = useState({
        timeCreated: "",
        visibility: "",
        hashtag: ""
    });
    const [currentUser, setCurrentUser] = useState(null);
    const [localActivity, setLocalActivity] = useState([]);
    const [globalActivity, setGlobalActivity] = useState([]);
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUserData = localStorage.getItem("user");
        let storedUser = null;
        if (storedUserData) {
            try {
                storedUser = JSON.parse(storedUserData);
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }
        setCurrentUser(storedUser);
    }, []);


    const handleSearch = () => {
        if (searchTerm) {
            fetchSearchResults();
        } else {
            // If no search term, show activity feeds
            fetchActivityFeeds();
        }
    };

const fetchSearchResults = async () => {
    setIsLoading(true);
    try {
        if (searchType === "projects") {
            const response = await fetch(`/api/search?type=project&query=${encodeURIComponent(searchTerm)}`);
            if (!response.ok) throw new Error('Failed to fetch projects');
            const data = await response.json();
            setProjects(data);
            setUsers([]);
            setMessages([]);
            setLocalActivity([]);
            setGlobalActivity([]);
        } else if (searchType === "users") {
            const response = await fetch(`/api/search?type=user&query=${encodeURIComponent(searchTerm)}`);
            if (!response.ok) throw new Error('Failed to fetch users');
            const data = await response.json();
            setUsers(data);
            setProjects([]);
            setMessages([]);
            setLocalActivity([]);
            setGlobalActivity([]);
        } else if (searchType === "messages") {
            const response = await fetch(`/api/search?type=project&query=${encodeURIComponent(searchTerm)}`);
            
            if (!response.ok) throw new Error('Failed to fetch messages');
            const data = await response.json();
            
            const projectsWithMatchingMessages = data.filter(project => 
                project.messages && project.messages.some(message => 
                    message.text.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
            
            const messageResults = [];
            projectsWithMatchingMessages.forEach(project => {
                project.messages.forEach(message => {
                    if (message.text.toLowerCase().includes(searchTerm.toLowerCase())) {
                        messageResults.push({
                            ...message,
                            projectName: project.name,
                            projectId: project.id,
                            projectHashtag: project.hashtag
                        });
                    }
                });
            });
            
            setMessages(messageResults);
            setProjects([]);
            setUsers([]);
            setLocalActivity([]);
            setGlobalActivity([]);
        }
    } catch (error) {
        console.error('Error fetching search results:', error);
    } finally {
        setIsLoading(false);
    }
};

    const fetchActivityFeeds = async () => {
        setIsLoading(true);
        try {
            setProjects([]);
            setUsers([]);
            await fetchGlobalActivity();
            if (currentUser?.id) {
                await fetchLocalActivity(currentUser.id);
            }
        } catch (error) {
            console.error('Error fetching activity feeds:', error);
        } finally {
            setIsLoading(false);
        }
    };

    
    useEffect(() => {
        fetchActivityFeeds();
    }, [currentUser]);

    const fetchLocalActivity = async (userId) => {
        try {
            const response = await fetch(`/api/activity/local/${userId}`);
            if (!response.ok) throw new Error('Failed to fetch local activity');
            const data = await response.json();
            const formattedData = data.map(activity => ({
                ...activity,
                project: activity.project || { id: activity.id, name: activity.name || 'Unnamed' }
            }));
            setLocalActivity(formattedData);
        } catch (error) {
            console.error('Error fetching local activity:', error);
        }
    };

    const fetchGlobalActivity = async () => {
        try {
            const response = await fetch('/api/activity/global');
            if (!response.ok) throw new Error('Failed to fetch global activity');
            const data = await response.json();
            setGlobalActivity(data);
        } catch (error) {
            console.error('Error fetching global activity:', error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    let filteredLocal = [...localActivity];
    let filteredGlobal = [...globalActivity];

   
    if (filters.timeCreated === "newest") {
        filteredLocal.sort((a, b) => new Date(b.time) - new Date(a.time));
        filteredGlobal.sort((a, b) => new Date(b.time) - new Date(a.time));
    } else if (filters.timeCreated === "oldest") {
        filteredLocal.sort((a, b) => new Date(a.time) - new Date(b.time));
        filteredGlobal.sort((a, b) => new Date(a.time) - new Date(b.time));
    }

    let displayedProjects = projects;
    if (searchTerm && searchType === "projects") {
        // Filter to show public or own private
        displayedProjects = displayedProjects.filter(project => project.isPublic || project.creatorId === currentUser?.id);

        if (filters.visibility === "public") {
            displayedProjects = displayedProjects.filter(project => project.isPublic);
        } else if (filters.visibility === "private") {
            displayedProjects = displayedProjects.filter(project => !project.isPublic);
        }

        if (filters.hashtag) {
            displayedProjects = displayedProjects.filter(project =>
                project.hashtag && project.hashtag.toLowerCase().includes(filters.hashtag.toLowerCase())
            );
        }

        if (filters.timeCreated === "newest") {
            displayedProjects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (filters.timeCreated === "oldest") {
            displayedProjects.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        }
    }

    return (
        <>
            <Navbar />
            <div className="home-page">
                <h1>Welcome back, {currentUser ? currentUser.name : "User"}</h1>
                
                <SearchInput 
                    value={searchTerm}
                    onChange={setSearchTerm}
                    onSearch={handleSearch}
                    placeholder={`Search ${searchType}...`} 
                />

                <Filters 
                    filters={filters}
                    setFilters={setFilters}
                    searchType={searchType}
                    setSearchType={setSearchType}
                />
          
                <div className="feeds-container">
                    {searchTerm ? (
                        searchType === "projects" ? (
                            displayedProjects.length > 0 ? (
                                <ProjectList projects={displayedProjects} />
                            ) : (
                                <div className="no-projects">
                                    <p>No projects found.</p>
                                    <p>Try adjusting your search terms.</p>
                                </div>
                            )
                        ) : (
                            users.length > 0 ? (
                                <div className="users-list">
                                    {users.map(user => (
                                        <div key={user.id} className="user-card">
                                            <img 
                                                src={user.avatar || "/assets/images/default-avatar.png"} 
                                                alt={user.name}
                                                className="user-avatar"
                                            />
                                            <span className="user-name">{user.name || 'Unknown'}</span>
                                            <p className="user-bio">{user.bio || 'No bio available'}</p>
                                            <span className="user-email">{user.email}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="no-users">
                                    <p>No users found.</p>
                                    <p>Try adjusting your search terms.</p>
                                </div>
                            )
                        )
                    ) : (
                        <>
                            <Feed 
                                title="Local Activity" 
                                activities={filteredLocal} 
                                type="local"
                            />
                            <Feed 
                                title="Global Activity" 
                                activities={filteredGlobal} 
                                type="global"
                            />
                        </>
                    )}
                </div>
            </div>
            <PalmTree />
            <Footer />
        </>
    );
};

export default Home;