import React, { useState } from "react";

const CreateProject = ({ onSubmit }) => {
    const [projectData, setProjectData] = useState({
        name: "",
        description: "",
        isPublic: true
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProjectData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(projectData);
        // Reset form
        setProjectData({ name: "", description: "", isPublic: true });
    };

    return (
        <form className="create-project-form" onSubmit={handleSubmit}>
            <h3>Create New Project</h3>
            <div className="form-group">
                <label htmlFor="projectName">Project Name</label>
                <input
                    type="text"
                    id="projectName"
                    name="name"
                    value={projectData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="projectDescription">Description</label>
                <textarea
                    id="projectDescription"
                    name="description"
                    value={projectData.description}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>
                    <input
                        type="checkbox"
                        name="isPublic"
                        checked={projectData.isPublic}
                        onChange={handleChange}
                    />
                    Public Project
                </label>
            </div>
            <button type="submit">Create Project</button>
        </form>
    );
};

export default CreateProject;