import React, { useState, useEffect } from "react";
import ProjectList from "../components/ProjectList";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Filters from "../components/filters";
import SearchInput from "../components/SearchInput";

const Discover = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchType, setSearchType] = useState("projects");
    const [filters, setFilters] = useState({
        timeCreated: "",
        visibility: "",
        hashtag: ""
    });
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleSearch = () => {
        if (searchTerm) {
            fetchSearchResults();
        } else {
            //  no search term, show all public projects
            fetchAllProjects();
        }
    };

    const fetchSearchResults = async () => {
        setIsLoading(true);
        try {
            if (searchType === "projects") {
                const url = `/api/search?type=project&query=${encodeURIComponent(searchTerm)}`;
                const response = await fetch(url);
                if (!response.ok) throw new Error('Failed to fetch projects');
                const data = await response.json();
                setProjects(data);
                setUsers([]);
                setMessages([]);
            } else if (searchType === "users") {
                setProjects([]);
                const response = await fetch(`/api/search?type=user&query=${encodeURIComponent(searchTerm)}`);
                if (!response.ok) throw new Error('Failed to fetch users');
                const data = await response.json();
                setUsers(data);
                setMessages([]);
            } else if (searchType === "messages") {
                setProjects([]);
                setUsers([]);
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
                                projectHashtag: project.hashtag,
                                projectImage: project.image,
                                isPublic: project.isPublic
                            });
                        }
                    });
                });
                
                setMessages(messageResults);
            }
        } catch (error) {
            console.error('Error fetching search results:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchAllProjects = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/projects');
            if (!response.ok) throw new Error('Failed to fetch projects');
            const data = await response.json();
            setProjects(data);
            setUsers([]);
            setMessages([]);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Load all projects on initial page load
    useEffect(() => {
        fetchAllProjects();
    }, []);

    let displayedProjects = projects;
    if (searchType === "projects") {
        // Apply visibility filter first
        if (filters.visibility === "public") {
            displayedProjects = displayedProjects.filter(project => project.isPublic);
        } else if (filters.visibility === "private") {
            displayedProjects = displayedProjects.filter(project => !project.isPublic);
        }

        // Additional filters
        if (filters.timeCreated === "newest") {
            displayedProjects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (filters.timeCreated === "oldest") {
            displayedProjects.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        }

        if (filters.hashtag) {
            displayedProjects = displayedProjects.filter(project =>
                project.hashtag && project.hashtag.toLowerCase().includes(filters.hashtag.toLowerCase())
            );
        }
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <div className="discover-page">
                <div className="discover-header">
                    <h1>Discover {searchType.charAt(0).toUpperCase() + searchType.slice(1)}</h1>
                    <p>Explore amazing public {searchType} from our community</p>
                </div>

                {/* Search and Filters */}
                <div className="discover-controls">
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
                </div>
                
                <div className="discover-content">
                    {searchType === "projects" ? (
                        displayedProjects.length > 0 ? (
                            <>
                                <div className="discover-count">
                                    Found {displayedProjects.length} project(s)
                                </div>
                                <ProjectList projects={displayedProjects} />
                            </>
                        ) : (
                            <div className="no-projects">
                                <p>No projects found.</p>
                                {searchTerm && <p>Try adjusting your search terms.</p>}
                            </div>
                        )
                    ) : searchType === "users" ? (
                        users.length > 0 ? (
                            <>
                                <div className="discover-count">
                                    Found {users.length} user(s)
                                </div>
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
                            </>
                        ) : (
                            <div className="no-users">
                                <p>No users found.</p>
                                {searchTerm && <p>Try adjusting your search terms.</p>}
                            </div>
                        )
                    ) : (
                        // Messages search results
                        messages.length > 0 ? (
                            <>
                                <div className="discover-count">
                                    Found {messages.length} message(s)
                                </div>
                                <div className="messages-list">
                                    {messages.map((message, index) => (
                                        <div key={`${message.projectId}-${message.id}`} className="message-card">
                                            <div className="message-header">
                                                <span className="message-project">
                                                    Project: {message.projectName}
                                                </span>
                                                <span className="message-hashtag">{message.projectHashtag}</span>
                                            </div>
                                            <div className="message-content">
                                                <p className="message-text">{message.text}</p>
                                                <div className="message-meta">
                                                    <span className="message-time">{message.time}</span>
                                                    <span className="message-user">User ID: {message.userId}</span>
                                                </div>
                                            </div>
                                            {message.projectImage && (
                                                <img 
                                                    src={message.projectImage} 
                                                    alt={message.projectName}
                                                    className="message-project-image"
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="no-messages">
                                <p>No check-in messages found.</p>
                                {searchTerm && <p>Try adjusting your search terms.</p>}
                            </div>
                        )
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Discover;