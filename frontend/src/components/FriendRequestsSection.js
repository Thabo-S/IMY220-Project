import React, { useState, useEffect } from "react";

const FriendRequestsSection = ({ currentUserId, onUpdate }) => {
    const [friendRequests, setFriendRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchFriendRequests();
    }, [currentUserId]);

    const fetchFriendRequests = async () => {
        try {
            const response = await fetch(`/api/friends/${currentUserId}`);
            if (!response.ok) throw new Error('Failed to fetch friend data');
            const data = await response.json();
            const incomingIds = data.incomingRequests || [];
            
            if (incomingIds.length > 0) {
                const usersResponse = await fetch(`/api/users?ids=${incomingIds.join(',')}`);
                if (!usersResponse.ok) throw new Error('Failed to fetch users');
                const requestUsers = await usersResponse.json();
                setFriendRequests(requestUsers);
            } else {
                setFriendRequests([]);
            }
        } catch (error) {
            console.error('Error fetching friend requests:', error);
            setFriendRequests([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAccept = async (friendId) => {
        try {
            const response = await fetch('/api/friends', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    userId: currentUserId, 
                    friendId, 
                    action: 'accept' 
                }),
            });
            if (!response.ok) throw new Error('Failed to accept friend request');
            await fetchFriendRequests(); // Refresh the list
            if (onUpdate) onUpdate(); 
        } catch (error) {
            console.error('Error accepting friend request:', error);
        }
    };

    const handleDecline = async (friendId) => {
        try {
            const response = await fetch('/api/friends', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    userId: currentUserId, 
                    friendId, 
                    action: 'decline' 
                }),
            });
            if (!response.ok) throw new Error('Failed to decline friend request');
            await fetchFriendRequests(); // Refresh the list
        } catch (error) {
            console.error('Error declining friend request:', error);
        }
    };

    if (isLoading) {
        return <div className="friend-requests-section">Loading friend requests...</div>;
    }

    if (friendRequests.length === 0) {
        return null; // Don't show anything if no requests
    }

    return (
        <section className="friend-requests-section">

            <div className="friend-requests-list">
                {friendRequests.map(request => (
                    <div key={request.id} className="friend-request-item">
                        <div className="request-user-info">
                            <img 
                                src={request.avatar || "/assets/images/default-avatar.png"} 
                                alt={request.name}
                                className="request-avatar"
                            />
                            <div className="request-details">
                                <span className="request-name">{request.name}</span>
                                <span className="request-bio">{request.bio}</span>
                            </div>
                        </div>
                        <div className="request-actions">
                            <button 
                                className="accept-btn"
                                onClick={() => handleAccept(request.id)}
                            >
                                Accept
                            </button>
                            <button 
                                className="reject-btn"
                                onClick={() => handleDecline(request.id)}
                            >
                                Decline
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FriendRequestsSection;