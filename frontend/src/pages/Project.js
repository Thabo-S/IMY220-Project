import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProjectFiles from "../components/ProjectFiles";
import ProjectMessages from "../components/ProjectMessages";
import EditProjectForm from "../components/EditProjectForm";
import TeamMembers from "../components/TeamMembers";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PalmTree from "../components/PalmTree";

const Project = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

        const fetchProject = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/projects/${parseInt(id)}`);
            if (!response.ok) throw new Error('Project not found');
            const data = await response.json();
            setProject(data);
        } catch (error) {
            console.error('Error fetching project:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const storedUserData = localStorage.getItem('user');
        let storedUser = null;
        if (storedUserData) {
            try {
                storedUser = JSON.parse(storedUserData);
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }
        setCurrentUser(storedUser);

        const fetchProject = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/projects/${parseInt(id)}`);
                if (!response.ok) throw new Error('Project not found');
                const data = await response.json();
                setProject(data);
            } catch (error) {
                console.error('Error fetching project:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProject();
    }, [id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!project) {
        return (
            <>
                <Navbar />
                <div className="project-page">
                    <div className="project-not-found">
                        <h1>Project Not Found</h1>
                        <p>The project you're looking for doesn't exist.</p>
                    </div>
                </div>
            </>
        );
    }

    const handleEditProject = async (updatedProject) => {
        try {
            const response = await fetch(`/api/projects/${project.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProject),
            });
            if (!response.ok) throw new Error('Failed to update project');
            const data = await response.json();
            setProject(data);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating project:', error);
        }
    };

    const handleDeleteProject = async () => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                const response = await fetch(`/api/projects/${project.id}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: currentUser?.id })
                });
                if (!response.ok) throw new Error('Failed to delete project');
                window.location.href = '/profile'; 
            } catch (error) {
                console.error('Error deleting project:', error);
            }
        }
    };

    const isCurrentUserCreator = currentUser && project.creator?.id === currentUser.id;

    if (isEditing) {
        return (
            <>
                <Navbar />
                <div className="project-page">
                    <EditProjectForm
                        project={project}
                        onSave={handleEditProject}
                        onCancel={() => setIsEditing(false)}
                    />
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="project-page">
                <header className="project-header">
                    <div className="project-header-main">
                        <h1>{project.name}</h1>
                        <p className="project-description">{project.description}</p>
                        <div className="project-meta">
                            <span className="hashtag">{project.hashtag}</span>
                            <span className="type">{project.isPublic ? 'Public' : 'Private'}</span>
                            <span className="creator">By {project.creator?.name || 'Unknown'}</span>
                        </div>
                        {project.image && <img src={project.image} alt={project.name} className="project-image" />}
                    </div>

                    {isCurrentUserCreator && (
                        <div className="project-actions">
                            <button className="action-btn primary" onClick={() => setIsEditing(true)}>Edit Project</button>
                            <button className="action-btn secondary" onClick={handleDeleteProject}>Delete Project</button>
                            <button className="action-btn secondary" onClick={() => setIsEditing(true)}>Add File</button>
                        </div>
                    )}
                </header>

                <main className="project-content">
                    <TeamMembers
                        project={project}
                        projectId={project.id}  
                        onTeamUpdate={fetchProject} 
                    />
                    <ProjectFiles files={project.files} />
                    <ProjectMessages messages={project.messages} />
                </main>
            </div>
            <PalmTree />
            <Footer />
        </>
    );
};

export default Project;