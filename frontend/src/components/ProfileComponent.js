import React, { useState, useEffect } from "react";
import EditProfileForm from "./EditProfileForm";

const ProfileComponent = ({ user }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [friendRequests, setFriendRequests] = useState([]);
    const [showRequests, setShowRequests] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        const storedUserData = localStorage.getItem('user');
        if (storedUserData) {
            try {
                const parsedUser = JSON.parse(storedUserData);
                setLoggedInUser(parsedUser);
                // Fetch friend requests if viewing own profile
                if (parsedUser.id === user.id) {
                    fetchFriendRequests();
                }
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }
    }, [user.id]);

const fetchFriendRequests = async () => {
    try {
        const response = await fetch(`/api/friends/${user.id}`);
        if (!response.ok) throw new Error('Failed to fetch friend data');
        const data = await response.json();
        console.log('Full fetched friend data:', data);
        const incomingIds = data.incomingRequests || [];
        console.log('Incoming IDs:', incomingIds);

        // Fetch users based on incomingIds
        if (incomingIds.length > 0) {
            const usersResponse = await fetch(`/api/users?ids=${incomingIds.join(',')}`);
            if (!usersResponse.ok) throw new Error('Failed to fetch users');
            const requestUsers = await usersResponse.json();
            console.log('Resolved friend requests:', requestUsers);
            setFriendRequests(requestUsers);
        } else {
            setFriendRequests([]);
        }
    } catch (error) {
        console.error('Error fetching friend requests:', error);
    }
};

    const handleAccept = async (friendId) => {
        try {
            const response = await fetch('/api/friends', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, friendId, action: 'accept' }),
            });
            if (!response.ok) throw new Error('Failed to accept friend request');
            await fetchFriendRequests();
        } catch (error) {
            console.error('Error accepting friend request:', error);
        }
    };

    const handleDecline = async (friendId) => {
        try {
            const response = await fetch('/api/friends', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, friendId, action: 'decline' }),
            });
            if (!response.ok) throw new Error('Failed to decline friend request');
            await fetchFriendRequests();
        } catch (error) {
            console.error('Error declining friend request:', error);
        }
    };

    const sendFriendRequest = async (friendId) => {
        try {
            const response = await fetch('/api/friends', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: loggedInUser.id, friendId: user.id, action: 'request' }),
            });
            if (!response.ok) throw new Error('Failed to send friend request');
            console.log('Friend request sent to', user.name);
        } catch (error) {
            console.error('Error sending friend request:', error);
        }
    };

    const isOwnProfile = loggedInUser && loggedInUser.id === user.id;
    const isFriend = loggedInUser && loggedInUser.friends && loggedInUser.friends.includes(user.id);
    const hasRequested = loggedInUser && loggedInUser.outgoingRequests && loggedInUser.outgoingRequests.includes(user.id);

    if (isEditing) {
        return <EditProfileForm user={user} onCancel={() => setIsEditing(false)} onSave={() => setIsEditing(false)} />;
    }

    return (
        <div className="profile-component">
            <div className="profile-header">
                <img src={user.avatar} alt={user.name} className="profile-avatar" />
                <div className="profile-info">
                    <h1>{user.name}</h1>
                    <p className="profile-bio">{user.bio}</p>
                    <div className="profile-stats">
                        <span>{user.projectsCount} projects</span>
                        <span>{user.followers} followers</span>
                        <span>{user.following} following</span>
                    </div>
                </div>
                {!isOwnProfile && (
                    <button
                        className="friend-request-btn"
                        onClick={() => sendFriendRequest(user.id)}
                        disabled={isFriend || hasRequested}
                    >
                        {isFriend ? 'Friends' : hasRequested ? 'Request Sent' : 'Send Friend Request'}
                    </button>
                )}
                {isOwnProfile && (
                    <button className="edit-profile-btn" onClick={() => setIsEditing(true)}>
                        Edit Profile
                    </button>
                )}
            </div>

            <div className="profile-details">
                <div className="detail-section">
                    <h3>Basic Info</h3>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Birthday:</strong> {user.birthday}</p>
                    <p><strong>Gender:</strong> {user.gender}</p>
                    <p><strong>Work:</strong> {user.work}</p>
                </div>

                <div className="detail-section">
                    <h3>Contact Info</h3>
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            </div>

            {showRequests && (
                <div className="friend-requests-modal">
                    <h3>Friend Requests</h3>
                    {friendRequests.length === 0 ? (
                        <p>No pending friend requests.</p>
                    ) : (
                        friendRequests.map(req => (
                            <div key={req.id} className="friend-request-item">
                                <img src={req.avatar} alt={req.name} className="request-avatar" />
                                <span>{req.name}</span>
                                <button className="accept-btn" onClick={() => handleAccept(req.id)}>Accept</button>
                                <button className="decline-btn" onClick={() => handleDecline(req.id)}>Decline</button>
                            </div>
                        ))
                    )}
                    <button onClick={() => setShowRequests(false)}>Close</button>
                </div>
            )}
        </div>
    );
};

export default ProfileComponent;