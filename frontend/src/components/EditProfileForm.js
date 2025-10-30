import React, { useState, useRef } from "react";

const EditProfileForm = ({ user, onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    name: user.name || "",
    bio: user.bio || "",
    birthday: user.birthday || "",
    gender: user.gender || "",
    work: user.work || "",
    phone: user.phone || "",
    email: user.email || ""
  });

  const [preview, setPreview] = useState(user.avatar || "");
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const imageRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage("Saving...");

    let finalAvatar = user.avatar;   // keep current if no new file

    try {
      // ---- 1. Upload avatar (if selected) ----
      const file = imageRef.current?.files[0];
      if (file) {
        const fd = new FormData();
        fd.append('avatar', file);               // field name must match route

        const upRes = await fetch(`/api/users/${user.id}/avatar`, {
          method: 'PUT',
          body: fd
        });

        if (!upRes.ok) throw new Error('Image upload failed');
        const upJson = await upRes.json();
        finalAvatar = upJson.avatar;             // <-- e.g. "/uploads/myphoto.jpg"
      }

      // ---- 2. Update other profile fields ----
      const profRes = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!profRes.ok) throw new Error('Profile update failed');

      // ---- 3. Update localStorage (including new avatar) ----
      const stored = JSON.parse(localStorage.getItem('user') || '{}');
      if (stored.id === user.id) {
        localStorage.setItem('user', JSON.stringify({ ...stored, ...formData, avatar: finalAvatar }));
      }

      setStatusMessage("Profile updated!");
      setTimeout(() => {
        onSave();
        window.location.reload();   // refreshes UI with new avatar
      }, 1000);
    } catch (err) {
      setStatusMessage("Error: " + err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="edit-profile-form">
      <h2>Edit Profile</h2>

      {statusMessage && (
        <div className={`status-message ${statusMessage.includes("Error") ? "error" : "success"}`}>
          {statusMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* ==== AVATAR ==== */}
        <div className="form-group">
          <label>Profile Picture</label>
          <div style={{ marginBottom: 8 }}>
            <img
              src={preview}
              alt="preview"
              style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover' }}
            />
          </div>
          <input
            type="file"
            accept="image/*"
            ref={imageRef}
            onChange={handleImageChange}
            disabled={isLoading}
          />
        </div>

        {/* ==== OTHER FIELDS ==== */}
        <div className="form-group"><label>Name</label><input name="name" value={formData.name} onChange={handleChange} required disabled={isLoading} /></div>
        <div className="form-group"><label>Bio</label><textarea name="bio" value={formData.bio} onChange={handleChange} rows="3" disabled={isLoading} /></div>
        <div className="form-group"><label>Email</label><input name="email" type="email" value={formData.email} onChange={handleChange} required disabled={isLoading} /></div>
        <div className="form-group"><label>Birthday</label><input name="birthday" type="date" value={formData.birthday} onChange={handleChange} disabled={isLoading} /></div>
        <div className="form-group"><label>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange} disabled={isLoading}>
            <option value="">Select</option>
            <option>Male</option><option>Female</option><option>Other</option><option>Prefer not to say</option>
          </select>
        </div>
        <div className="form-group"><label>Work</label><input name="work" value={formData.work} onChange={handleChange} disabled={isLoading} /></div>
        <div className="form-group"><label>Phone</label><input name="phone" type="tel" value={formData.phone} onChange={handleChange} disabled={isLoading} /></div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} disabled={isLoading} className="cancel-btn">Cancel</button>
          <button type="submit" disabled={isLoading} className="save-btn">
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;