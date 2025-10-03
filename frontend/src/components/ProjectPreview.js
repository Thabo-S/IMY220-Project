import React from "react";
import { Link } from "react-router-dom";

const ProjectPreview = ({ project }) => {
    if (!project) {
        return (
            <article className="project-preview">
                <div className="project-info">
                    <h3>Project Not Available</h3>
                    <p className="project-description">Unable to load project information</p>
                </div>
            </article>
        );
    }

    const projectData = project.project || project;
    const projectId = projectData.id || project.id;
    const projectName = projectData.name || "Unnamed Project";
    const projectDescription = projectData.description || "No description available";
    const hashtag = projectData.hashtag || project.hashtag || "#general";
    const lastActivity = project.time || project.lastActivity || "Recently";

    return (
        <Link to={`/project/${projectId}`} className="project-link">
            <article className="project-preview">
                <div className="project-info">
                    <h3>{projectName}</h3>
                    <p className="project-description">{projectDescription}</p>
                    <div className="project-meta">
                        <span className="hashtag">{hashtag}</span>
                        <span className="last-activity">Last activity: {lastActivity}</span>
                    </div>
                </div>
            </article>
        </Link>
    );
};

export default ProjectPreview;