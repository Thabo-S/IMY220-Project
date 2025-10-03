import React, { useState } from "react";

const CreateProjectForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    hashtag: "",
    isPublic: true,
  });
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCurrentUser = () => {
    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
      try {
        return JSON.parse(storedUserData);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
    return null;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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
    const currentUser = getCurrentUser();
    if (!currentUser) {
      setError('Please log in to create a project');
      setIsLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('hashtag', formData.hashtag);
    formDataToSend.append('isPublic', formData.isPublic);
    formDataToSend.append('creatorId', currentUser.id);
    files.forEach(file => formDataToSend.append('files', file));
    if (image) formDataToSend.append('image', image);

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        body: formDataToSend,
      });
      if (!response.ok) throw new Error('Failed to create project');
      const createdProject = await response.json();
      if (onSubmit) onSubmit(createdProject);
      setFormData({ name: "", description: "", hashtag: "", isPublic: true });
      setFiles([]);
      setImage(null);
    } catch (error) {
      setError(error.message);
      console.error('Error creating project:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-project-form">
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
            placeholder="Enter project name"
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
            placeholder="Describe your project"
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
          <label htmlFor="isPublic" className="checkbox-label">Public</label>
          <input
            type="checkbox"
            id="isPublic"
            name="isPublic"
            checked={formData.isPublic}
            onChange={handleChange}
          />
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
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Project'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProjectForm;