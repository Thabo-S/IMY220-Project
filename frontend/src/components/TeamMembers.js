import React, { useState, useEffect } from "react";

const TeamMembers = ({ project, projectId, onTeamUpdate }) => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [availableUsers, setAvailableUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showAddMember, setShowAddMember] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const creator = project.creator || { id: 0, name: 'Unknown Creator', avatar: '/assets/images/default-avatar.png' };
    const currentUser = JSON.parse(localStorage.getItem('user')) || {};
    const actualProjectId = projectId || project?.id;
    const isCreator = currentUser.id === creator.id;

    // Project checkout status
    const lockedBy = project.lockedBy;
    const isCheckedOut = lockedBy !== null;
    const checkedOutByCurrentUser = lockedBy === currentUser.id;

    // Fetch current team members
    const fetchTeamMembers = async () => {
        if (!actualProjectId) return;
        try {
            const response = await fetch(`/api/projects/${actualProjectId}/team`);
            if (!response.ok) throw new Error('Failed to fetch team');
            const data = await response.json();
            const userIds = data.teamMembers || [];

            if (userIds.length > 0) {
                const usersResponse = await fetch(`/api/users?ids=${userIds.join(',')}`);
                if (usersResponse.ok) {
                    const members = await usersResponse.json();
                    setTeamMembers(members);
                }
            } else {
                setTeamMembers([]);
            }
        } catch (error) {
            console.error('Error fetching team members:', error);
            setTeamMembers([]);
        }
    };

    const searchAvailableUsers = async (query = "") => {
        if (!isCreator) return;

        try {
            const url = `/api/search?type=user&query=${encodeURIComponent(query)}`;
            const response = await fetch(url);

            if (!response.ok) {
                if (response.status === 404) {
                    console.warn('Search endpoint not found. Is /api/search implemented?');
                }
                throw new Error('Failed to search users');
            }

            const users = await response.json();

            const teamMemberIds = teamMembers.map(tm => tm.id);
            const filtered = users.filter(u =>
                u.id !== creator.id &&
                !teamMemberIds.includes(u.id)
            );

            setAvailableUsers(filtered);
        } catch (error) {
            console.error('Error searching users:', error);
            setAvailableUsers([]);
        }
    };

    useEffect(() => {
        fetchTeamMembers();
    }, [actualProjectId]);

    useEffect(() => {
        if (showAddMember && isCreator) {
            const timeoutId = setTimeout(() => {
                searchAvailableUsers(searchQuery);
            }, 300); 

            return () => clearTimeout(timeoutId);
        }
    }, [searchQuery, showAddMember, teamMembers, isCreator]);

    const refreshTeam = async () => {
        await fetchTeamMembers();
        if (onTeamUpdate) onTeamUpdate();
    };

    const handleRemoveMember = async (memberId) => {
        if (!window.confirm('Remove this team member?')) return;

        setIsLoading(true);
        try {
            const response = await fetch(`/api/projects/${actualProjectId}/team`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: currentUser.id,
                    memberId,
                    action: 'remove'
                }),
            });

            if (!response.ok) throw new Error('Failed to remove member');
            await refreshTeam();
        } catch (error) {
            alert('Failed to remove member');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddMember = async (memberId) => {
        const isTeamMember = Array.isArray(project.teamMembers) && project.teamMembers.includes(currentUser.id);
        const canModifyTeam = isCreator || isTeamMember;
        setIsLoading(true);
        try {
            const response = await fetch(`/api/projects/${actualProjectId}/team`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: currentUser.id,
                    memberId,
                    action: 'add'
                }),
            });

            if (!response.ok) throw new Error('Failed to add member');
            setSearchQuery("");
            await refreshTeam();
        } catch (error) {
            alert('Failed to add member');
        } finally {
            setIsLoading(false);
        }
    };

    const handleTransferOwnership = async (newOwnerId) => {
        if (!window.confirm('Transfer ownership? You will no longer be the owner.')) return;

        setIsLoading(true);
        try {
            const response = await fetch(`/api/projects/${actualProjectId}/transfer-ownership`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    currentOwnerId: currentUser.id,
                    newOwnerId
                }),
            });

            if (!response.ok) throw new Error('Transfer failed');
            alert('Ownership transferred!');
            window.location.reload();
        } catch (error) {
            alert('Failed to transfer ownership');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCheckout = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/projects/${actualProjectId}/checkout`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: currentUser.id }),
            });
            if (!response.ok) throw new Error('Checkout failed');
            if (onTeamUpdate) onTeamUpdate();
        } catch (error) {
            alert('Project is already checked out.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCheckin = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/projects/${actualProjectId}/checkin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: currentUser.id,
                    text: 'Checked in project'
                }),
            });
            if (!response.ok) throw new Error('Checkin failed');
            if (onTeamUpdate) onTeamUpdate();
        } catch (error) {
            alert('Failed to check in.');
        } finally {
            setIsLoading(false);
        }
    };

    const allMembers = [creator, ...teamMembers];

    return (
        <section className="team-members">
            <div className="team-header">
                <h3>Team Members ({allMembers.length})</h3>
                <div className={`project-status ${isCheckedOut ? 'checked-out' : 'available'}`}>
                    {isCheckedOut ? (
                        <>
                            <span className="status-icon">Locked</span>
                            <span>Checked Out {checkedOutByCurrentUser ? '(by you)' : ''}</span>
                        </>
                    ) : (
                        <>
                            <span className="status-icon">Checkmark</span>
                            <span>Available</span>
                        </>
                    )}
                </div>
            </div>

            {/* Checkout / Checkin Buttons */}
            <div className="checkout-controls">
                {!isCheckedOut && (
                    <button className="checkout-btn" onClick={handleCheckout} disabled={isLoading}>
                        Check Out Project
                    </button>
                )}
                {checkedOutByCurrentUser && (
                    <button className="checkin-btn" onClick={handleCheckin} disabled={isLoading}>
                        Check In Project
                    </button>
                )}
            </div>

            {/* Team Member List */}
            <div className="members-list">
                {allMembers.map(member => {
                    const isProjectCreator = member.id === creator.id;
                    const canRemove = isCreator && !isProjectCreator;
                    const canTransfer = isCreator && !isProjectCreator;

                    return (
                        <div key={member.id} className="team-member">
                            <img
                                src={member.avatar || "/assets/images/default-avatar.png"}
                                alt={member.name}
                                className="member-avatar"
                            />
                            <div className="member-info">
                                <span className="member-name">{member.name || 'Unknown'}</span>
                                {isProjectCreator && <span className="member-role owner">Owner</span>}
                            </div>
                            <div className="member-actions">
                                {canRemove && (
                                    <button
                                        className="team-action-btn remove"
                                        onClick={() => handleRemoveMember(member.id)}
                                        disabled={isLoading}
                                    >
                                        Remove
                                    </button>
                                )}
                                {canTransfer && (
                                    <button
                                        className="team-action-btn transfer"
                                        onClick={() => handleTransferOwnership(member.id)}
                                        disabled={isLoading}
                                    >
                                        Make Owner
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Add Member Panel */}
            {isCreator && (
                <div className="add-member-section">
                    {!showAddMember ? (
                        <button
                            className="add-member-btn"
                            onClick={() => setShowAddMember(true)}
                        >
                            + Add Team Member
                        </button>
                    ) : (
                        <div className="add-member-form">
                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                                autoFocus
                            />
                            <div className="user-list">
                                {availableUsers.length > 0 ? (
                                    availableUsers.map(user => (
                                        <div key={user.id} className="user-item">
                                            <img
                                                src={user.avatar || "/assets/images/default-avatar.png"}
                                                alt={user.name}
                                                className="user-avatar"
                                            />
                                            <div className="user-details">
                                                <span className="user-name">{user.name}</span>
                                                <span className="user-email">{user.email}</span>
                                            </div>
                                            <button
                                                className="team-action-btn add"
                                                onClick={() => handleAddMember(user.id)}
                                                disabled={isLoading}
                                            >
                                                Add
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <p className="no-users">
                                        {searchQuery.trim()
                                            ? 'No users found matching your search'
                                            : 'Type to search users...'}
                                    </p>
                                )}
                            </div>
                            <button
                                className="cancel-btn"
                                onClick={() => {
                                    setShowAddMember(false);
                                    setSearchQuery("");
                                    setAvailableUsers([]);
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
};

export default TeamMembers;