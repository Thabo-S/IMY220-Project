import React from "react";
import { Link } from "react-router-dom";

const ActivityItem = ({ activity }) => {
    const renderLabel = () => {
        switch (activity.type) {
            case "checkin":
                return "Check-in";
            case "update":
                return "Update";
            default:
                return "Activity";
        }
    };

    const projectId = activity.project?.id || (activity.id ? `/activity/${activity.id}` : '#');
    const userName = activity.user?.name || 'Unknown User';
    const projectName = activity.project?.name || 'Unnamed Project';

    return (
        <Link to={`/project/${projectId}`} className="activity-link">
            <div className="activity-item">
                <div className="activity-header">
                    <img 
                        src={activity.user?.avatar || "/assets/images/default-avatar.png"} 
                        alt={userName}
                        className="activity-avatar"
                    />
                    <div className="activity-user-info">
                        <strong>{userName}</strong>
                        <span className="activity-type">{renderLabel()}</span>
                    </div>
                </div>
                <div className="activity-content">
                    <p className="activity-message">
                        {activity.message || `${activity.type} in ${projectName}`}
                    </p>
                    <div className="activity-project">
                        <strong>Project:</strong> {projectName}
                        {activity.project?.hashtag && (
                            <span className="activity-hashtag">{activity.project.hashtag}</span>
                        )}
                    </div>
                    <small className="activity-time">{activity.time}</small>
                </div>
            </div>
        </Link>
    );
};

export default ActivityItem;