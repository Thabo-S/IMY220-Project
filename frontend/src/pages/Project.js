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

    const [showCheckin, setShowCheckin] = useState(false);
    const [checkinText, setCheckinText] = useState("");
    const [checkinFiles, setCheckinFiles] = useState([]);

    const fetchProject = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/projects/${parseInt(id)}`);
            if (!response.ok) throw new Error("Project not found");
            const data = await response.json();
            setProject(data);
        } catch (error) {
            console.error("Error fetching project:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Load logged-in user
        const stored = localStorage.getItem("user");
        if (stored) {
            try { setCurrentUser(JSON.parse(stored)); }
            catch (e) { console.error("Invalid user JSON", e); }
        }

        fetchProject();
    }, [id]);

 
    const isOwner = currentUser && project?.creator?.id === currentUser.id;
    const isTeamMember = currentUser && 
        Array.isArray(project?.teamMembers) && 
        project.teamMembers.includes(currentUser.id);
    const canCheckin = isOwner || isTeamMember;

 
    const handleEditProject = async (updatedProject) => {
        try {
            const res = await fetch(`/api/projects/${project.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedProject),
            });
            if (!res.ok) throw new Error("Failed to update");
            const data = await res.json();
            setProject(data);
            setIsEditing(false);
        } catch (e) {
            console.error("Edit error:", e);
        }
    };

    const handleDeleteProject = async () => {
        if (!window.confirm("Delete this project?")) return;
        try {
            const res = await fetch(`/api/projects/${project.id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: currentUser?.id })
            });
            if (!res.ok) throw new Error("Delete failed");
            window.location.href = "/profile";
        } catch (e) {
            console.error("Delete error:", e);
        }
    };

 
 
    const handleCheckin = async () => {
        if (!checkinFiles.length && !checkinText.trim()) {
            alert("Add files or a description");
            return;
        }

        setIsLoading(true);
        const form = new FormData();
        form.append("userId", currentUser.id);
        if (checkinText) form.append("text", checkinText);
        Array.from(checkinFiles).forEach(f => form.append("files", f));

        try {
            const res = await fetch(`/api/projects/${project.id}/checkin`, {
                method: "POST",
                body: form
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Check-in failed");
            }
            const updated = await res.json();
            setProject(updated);
            setShowCheckin(false);
            setCheckinText("");
            setCheckinFiles([]);
        } catch (e) {
            alert(e.message);
        } finally {
            setIsLoading(false);
        }
    };



    if (isLoading) return <div className="loading">Loading...</div>;

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
                <Footer />
            </>
        );
    }

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
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="project-page">

                {/*  HEADER  */}
                <header className="project-header">
                    <div className="project-header-main">
                        <h1>{project.name}</h1>
                        <p className="project-description">{project.description}</p>
                        <div className="project-meta">
                            <span className="hashtag">{project.hashtag}</span>
                            <span className="type">{project.isPublic ? "Public" : "Private"}</span>
                            <span className="creator">By {project.creator?.name || "Unknown"}</span>
                        </div>
                        {project.image && <img src={project.image} alt={project.name} className="project-image" />}
                    </div>

                    {/* Owner actions */}
                    {isOwner && (
                        <div className="project-actions">
                            <button className="action-btn primary" onClick={() => setIsEditing(true)}>
                                Edit Project
                            </button>
                            <button className="action-btn secondary" onClick={handleDeleteProject}>
                                Delete Project
                            </button>
                        </div>
                    )}

                    {/* Member check-in button */}
                    {canCheckin && !isOwner && (
                        <div className="project-actions member-actions">
                            <button className="action-btn secondary" onClick={() => setShowCheckin(true)}>
                                Upload Files / Check In
                            </button>
                        </div>
                    )}
                </header>

                {/*  MAIN CONTENT  */}
                <main className="project-content">
                    <TeamMembers
                        project={project}
                        projectId={project.id}
                        onTeamUpdate={fetchProject}
                    />
                    <ProjectFiles files={project.files} projectId={project.id} />
                    <ProjectMessages messages={project.messages} />
                </main>

                {showCheckin && (
                    <div className="modal-overlay" onClick={() => setShowCheckin(false)}>
                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                            <h3>Check In Project</h3>
                            <textarea
                                placeholder="What did you change? (optional)"
                                value={checkinText}
                                onChange={e => setCheckinText(e.target.value)}
                                rows={3}
                            />
                            <input
                                type="file"
                                multiple
                                onChange={e => setCheckinFiles(e.target.files)}
                                style={{ margin: "10px 0" }}
                            />
                            <div className="modal-actions">
                                <button
                                    className="btn-primary"
                                    onClick={handleCheckin}
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Checking in..." : "Check In"}
                                </button>
                                <button
                                    className="btn-secondary"
                                    onClick={() => {
                                        setShowCheckin(false);
                                        setCheckinText("");
                                        setCheckinFiles([]);
                                    }}
                                    disabled={isLoading}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <PalmTree />
            <Footer />
        </>
    );
};

export default Project;