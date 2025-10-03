import React, { useState, useEffect } from "react";

const TeamMembers = ({ project, projectId, onTeamUpdate }) => {
    const [teamMembers, setTeamMembers] = useState([]);
    const creator = project.creator || { id: 0, name: 'Unknown Creator', avatar: '/assets/images/default-avatar.png' };
    const currentUser = JSON.parse(localStorage.getItem('user')) || {};

    const actualProjectId = projectId || project?.id;

    useEffect(() => {
        const fetchTeamMembers = async () => {
            if(!actualProjectId)return;
            try {
                const response = await fetch(`/api/projects/${actualProjectId}/team`);
                if (response.ok) {
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
                }
            } catch (error) {
                console.error('Error fetching team members:', error);
                setTeamMembers([]);
            }
        };
        fetchTeamMembers();
    }, [projectId]);

    const handleRemoveMember = async (memberId) => {
        try {
            const response = await fetch(`/api/projects/${projectId}/team`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: currentUser.id,
                    memberId,
                    action: 'remove'
                }),
            });
            if (!response.ok) throw new Error('Failed to remove team member');
            if (onTeamUpdate) onTeamUpdate();
            console.log("Team member removed:", memberId);
        } catch (error) {
            console.error('Error removing team member:', error);
        }
    };

    const handleAddMember = async (memberId) => {
        try {
            const response = await fetch(`/api/projects/${projectId}/team`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: currentUser.id,
                    memberId,
                    action: 'add'
                }),
            });
            if (!response.ok) throw new Error('Failed to add team member');
            if (onTeamUpdate) onTeamUpdate();
            console.log("Team member added:", memberId);
        } catch (error) {
            console.error('Error adding team member:', error);
        }
    };

    const allMembers = [creator, ...teamMembers];

    return (
        <section className="team-members">
            <h3>Team Members</h3>
            <div className="members-list">
                {allMembers.map(member => (
                    <div key={member.id} className="team-member">
                        <img 
                            src={member.avatar || "/assets/images/default-avatar.png"} 
                            alt={member.name}
                            className="member-avatar"
                        />
                        <span className="member-name">{member.name || 'Unknown'}</span>
                        {member.id === creator.id && (
                            <span className="member-role">Creator</span>
                        )}
                        {member.id !== creator.id && (
                            <>
                                <button 
                                    className="team-action-btn remove"
                                    onClick={() => handleRemoveMember(member.id)}
                                >
                                    Remove
                                </button>
                                <button 
                                    className="team-action-btn add"
                                    onClick={() => handleAddMember(member.id)}
                                >
                                    Add
                                </button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TeamMembers;