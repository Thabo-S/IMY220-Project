import React from "react";
import ProjectPreview from "./ProjectPreview";
import ActivityItem from "./ActivityItem";

const Feed = ({ title, activities, type }) => {
    return (
        <section className="feed">
            <h2>{title}</h2>
            <div className="feed-content">
                {activities.map((activity, index) => (
                    type === 'local' ? (
                        <ActivityItem 
                            key={`${activity.id}-${activity.project?.id}-${index}`} 
                            activity={activity} 
                        />
                    ) : (
                        <ProjectPreview 
                            key={`${activity.project?.id}-${activity.id}-${index}`} 
                            project={activity.project || activity} 
                        />
                    )
                ))}
            </div>
        </section>
    );
};

export default Feed;