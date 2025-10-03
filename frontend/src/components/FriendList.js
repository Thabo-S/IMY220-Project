import React from "react";
import { Link } from "react-router-dom";

const FriendList = ({ friends, onFriendsUpdate }) => {
    const handleRemoveFriend = async (friendId) => {
        try {
            const response = await fetch('/api/friends', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: JSON.parse(localStorage.getItem('user'))?.id,
                    friendId,
                }),
            });
            if (!response.ok) throw new Error('Failed to remove friend');
            if (onFriendsUpdate) onFriendsUpdate();
            console.log("Friend removed:", friendId);
        } catch (error) {
            console.error('Error removing friend:', error);
        }
    };

    return (
        <div className="friend-list">
            {friends.map(friend => (
                <div key={friend.id} className="friend-item">
                    <img src={friend.avatar} alt={friend.name} className="friend-avatar" />
                    <div className="friend-info">
                        <Link to={`/profile/${friend.id}`} className="friend-name">
                            {friend.name}
                        </Link>
                        <p className="friend-bio">{friend.bio}</p>
                        <div className="friend-stats">
                            <span>{friend.projectsCount} projects</span>
                            <span>{friend.followers} followers</span>
                        </div>
                    </div>
                    <div className="friend-actions">
                        <button 
                            className="friend-action-btn remove"
                            onClick={() => handleRemoveFriend(friend.id)}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FriendList;