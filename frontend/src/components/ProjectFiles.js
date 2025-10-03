import React from 'react';

const ProjectFiles = ({ files, projectId }) => {
    return (
        <section className="project-files">
            <h3>Files</h3>
            <ul>
                {files.map(file => (
                    <li key={file.id}>
                        <span>{file.name}</span>
                        <small>Created: {file.created}</small>
                        <a href={`/api/projects/${projectId}/files/${file.id}`} download className="download-link">Download</a>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default ProjectFiles;