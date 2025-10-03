import React, { useState, useEffect } from "react";

const PendingFriendRequests = ({ currentUserId, onUpdate }) => {
    const [incomingRequests, setIncomingRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchPendingRequests();
    }, [currentUserId]);

    const fetchPendingRequests = async () => {
        try {
            const response = await fetch(`/api/friend-requests/pending/${currentUserId}`);
            if (!response.ok) throw new Error('Failed to fetch requests');
            const data = await response.json();
            console.log('Friend request data: ' , data);
            console.log('incoming requests: ', data.incoming);
            setIncomingRequests(data.incoming || []);
        } catch (error) {
            console.error('Error fetching friend requests:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAccept = async (fromUserId) => {
        try {
            const response = await fetch('/api/friend-request/accept', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ from: fromUserId, to: currentUserId }),
            });
            if (!response.ok) throw new Error('Failed to accept request');
            
            // Refresh the requests list
            fetchPendingRequests();
            if (onUpdate) onUpdate(); // Notify parent to refresh friends list
        } catch (error) {
            console.error('Error accepting friend request:', error);
        }
    };

    const handleReject = async (fromUserId) => {
        try {
            const response = await fetch('/api/friend-request/reject', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ from: fromUserId, to: currentUserId }),
            });
            if (!response.ok) throw new Error('Failed to reject request');
            
            // Refresh the requests list
            fetchPendingRequests();
        } catch (error) {
            console.error('Error rejecting friend request:', error);
        }
    };

    if (isLoading) {
        return <div>Loading friend requests...</div>;
    }

    if (incomingRequests.length === 0) {
        return null; // Don't show anything if no requests
    }

    return (
        <section className="pending-friend-requests">
            <h3>Friend Requests</h3>
            <div className="requests-list">
                {incomingRequests.map(request => (
                    <div key={request._id || request.from} className="friend-request-item">
                        <div className="request-info">
                            <span className="request-from">User ID: {request.from}</span>
                        </div>
                        <div className="request-actions">
                            <button 
                                className="accept-btn"
                                onClick={() => handleAccept(request.from)}
                            >
                                Accept
                            </button>
                            <button 
                                className="reject-btn"
                                onClick={() => handleReject(request.from)}
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PendingFriendRequests;