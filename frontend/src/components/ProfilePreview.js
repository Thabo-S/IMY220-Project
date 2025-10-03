import React from "react";
import { Link } from "react-router-dom";

const ProfilePreview = ({ user }) => {
    return (
        <div className="profile-preview">
            <Link to={`/profile/${user.id}`} className="profile-link">
                <div className="profile-avatar">
                    <img
                        src={user.avatar || "/assets/images/default-avatar.png"}
                        alt={`${user.name || 'Unknown User'}'s avatar`}
                    />
                </div>
                <div className="profile-info">
                    <h4 className="profile-name">{user.name || 'Unknown User'}</h4>
                    <p className="profile-bio">{user.bio || 'No bio available'}</p>
                    <div className="profile-stats">
                        <span>{user.projectsCount || 0} projects</span>
                        <span>{user.followers || 0} followers</span>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProfilePreview;