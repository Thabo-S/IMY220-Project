import React from "react";
import ProjectPreview from "./ProjectPreview";

const ProjectList = ({ projects }) => {
    return (
        <div className="project-list">
            {projects.map(project => (
                <ProjectPreview key={project.id} project={project} />
            ))}
        </div>
    );
};

export default ProjectList;