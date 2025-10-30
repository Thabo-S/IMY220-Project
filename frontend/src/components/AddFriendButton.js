import React, { useState, useEffect } from "react";

const AddFriendButton = ({ targetUserId, currentUserId, onStatusChange }) => {
    const [status, setStatus] = useState('none'); 
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkFriendStatus();
    }, [targetUserId, currentUserId]);

    const checkFriendStatus = async () => {
        if (!currentUserId || !targetUserId || currentUserId === targetUserId) {
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`/api/friends/${currentUserId}`);
            if (!response.ok) throw new Error('Failed to fetch friend status');
            const data = await response.json();

            
            if (data.friends?.includes(targetUserId)) {
                setStatus('friends');
            } 
            
            else if (data.outgoingRequests?.includes(targetUserId)) {
                setStatus('pending');
            }
            
            else if (data.incomingRequests?.includes(targetUserId)) {
                setStatus('incoming');
            }
            else {
                setStatus('none');
            }
        } catch (error) {
            console.error('Error checking friend status:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendRequest = async () => {
        try {
            const response = await fetch('/api/friends', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    userId: currentUserId, 
                    friendId: targetUserId, 
                    action: 'request' 
                }),
            });
            if (!response.ok) throw new Error('Failed to send friend request');
            setStatus('pending');
            if (onStatusChange) onStatusChange('pending');
        } catch (error) {
            console.error('Error sending friend request:', error);
            alert('Failed to send friend request');
        }
    };

    const handleCancelRequest = async () => {
        try {
            const response = await fetch('/api/friends', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    userId: currentUserId, 
                    friendId: targetUserId, 
                    action: 'decline' 
                }),
            });
            if (!response.ok) throw new Error('Failed to cancel request');
            setStatus('none');
            if (onStatusChange) onStatusChange('none');
        } catch (error) {
            console.error('Error canceling request:', error);
            alert('Failed to cancel request');
        }
    };

    const handleAcceptRequest = async () => {
        try {
            const response = await fetch('/api/friends', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    userId: currentUserId, 
                    friendId: targetUserId, 
                    action: 'accept' 
                }),
            });
            if (!response.ok) throw new Error('Failed to accept request');
            setStatus('friends');
            if (onStatusChange) onStatusChange('friends');
        } catch (error) {
            console.error('Error accepting request:', error);
            alert('Failed to accept request');
        }
    };

    const handleRemoveFriend = async () => {
        try {
            const response = await fetch('/api/friends', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    userId: currentUserId, 
                    friendId: targetUserId, 
                    action: 'remove' 
                }),
            });
            if (!response.ok) throw new Error('Failed to remove friend');
            setStatus('none');
            if (onStatusChange) onStatusChange('none');
        } catch (error) {
            console.error('Error removing friend:', error);
            alert('Failed to remove friend');
        }
    };

    // Don't show button for own profile
    if (!currentUserId || currentUserId === targetUserId) {
        return null;
    }

    if (isLoading) {
        return <button className="add-friend-btn loading" disabled>Loading...</button>;
    }

    if (status === 'friends') {
        return (
            <button 
                className="add-friend-btn friends"
                onClick={handleRemoveFriend}
            >
                ✓ Friends
            </button>
        );
    }

    if (status === 'pending') {
        return (
            <button 
                className="add-friend-btn pending"
                onClick={handleCancelRequest}
            >
                Request Sent
            </button>
        );
    }

    if (status === 'incoming') {
        return (
            <div className="add-friend-incoming">
                <button 
                    className="add-friend-btn accept"
                    onClick={handleAcceptRequest}
                >
                    Accept Request
                </button>
            </div>
        );
    }

    return (
        <button 
            className="add-friend-btn"
            onClick={handleSendRequest}
        >
            + Add Friend
        </button>
    );
};

export default AddFriendButton;