import React from 'react';

const ProjectFiles = ({ files, projectId }) => {
    if (!files || files.length === 0) {
        return (
            <section className="project-files">
                <h3>Files</h3>
                <p className="no-files">No files uploaded yet</p>
            </section>
        );
    }

    const formatDate = (dateString) => {
        if (!dateString) return 'Unknown';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <section className="project-files">
            <h3>Files ({files.length})</h3>
            <div className="files-list">
                {files.map(file => (
                    <div key={file.id} className="file-item">
                        <div className="file-icon">
                            📄
                        </div>
                        <div className="file-info">
                            <span className="file-name">{file.name}</span>
                            <small className="file-date">Created: {formatDate(file.created)}</small>
                        </div>
                        <a 
                            href={`/api/projects/${projectId}/files/${file.id}`} 
                            download 
                            className="download-link"
                        >
                            ⬇ Download
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProjectFiles;