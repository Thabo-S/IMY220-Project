import React, { useState } from "react";

const EditProjectForm = ({ project, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: project.name || "",
        description: project.description || "",
        hashtag: project.hashtag || "",
        isPublic: project.isPublic || true
    });
    const [files, setFiles] = useState([]);
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files));
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('hashtag', formData.hashtag);
        formDataToSend.append('isPublic', formData.isPublic);
        files.forEach(file => formDataToSend.append('files', file));
        if (image) formDataToSend.append('image', image);

        try {
            const response = await fetch(`/api/projects/${project.id}`, {
                method: 'PUT',
                body: formDataToSend,
            });
            if (!response.ok) throw new Error('Failed to update project');
            const updatedProject = await response.json();
            onSave(updatedProject);
        } catch (error) {
            setError(error.message);
            console.error('Error updating project:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="edit-project-form">
            <h2>Edit Project</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="projectName">Project Name</label>
                    <input
                        type="text"
                        id="projectName"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="projectDescription">Description</label>
                    <textarea
                        id="projectDescription"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows="4"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="projectHashtag">Hashtag</label>
                    <input
                        type="text"
                        id="projectHashtag"
                        name="hashtag"
                        value={formData.hashtag}
                        onChange={handleChange}
                        placeholder="#ProjectTag"
                    />
                </div>

                <div className="form-group checkbox-group">
                    <label>
                        <input
                            type="checkbox"
                            name="isPublic"
                            checked={formData.isPublic}
                            onChange={handleChange}
                        />
                        Public Project
                    </label>
                </div>

                <div className="form-group">
                    <label htmlFor="projectFiles">Files</label>
                    <input
                        type="file"
                        id="projectFiles"
                        multiple
                        onChange={handleFileChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="projectImage">Image</label>
                    <input
                        type="file"
                        id="projectImage"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>

                {error && <div className="error-text">{error}</div>}
                
                <div className="form-actions">
                    <button type="button" onClick={onCancel} disabled={isLoading}>Cancel</button>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProjectForm;