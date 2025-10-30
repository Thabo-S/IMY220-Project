import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProfileComponent from "../components/ProfileComponent";
import ProjectList from "../components/ProjectList";
import FriendList from "../components/FriendList";
import CreateProjectForm from "../components/CreateProjectForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PalmTree from "../components/PalmTree";
import FriendRequestsSection from "../components/FriendRequestsSection";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [userProjects, setUserProjects] = useState([]);
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem('user');
    let storedUser = null;
    if (storedUserData) {
      try {
        storedUser = JSON.parse(storedUserData);
      } catch (error) {
        console.error('Error parsing user data: ', error);
      }
    }

    const fetchLoggedInUserFriends = async () => {
      if (storedUser?.id) {
        try {
          const response = await fetch(`/api/friends/${storedUser.id}`);
          if (response.ok) {
            const data = await response.json();
            setLoggedInUser(prev => ({
              ...prev,
              ...storedUser,
              friends: data.friends || [],
              outgoingRequests: data.outgoingRequests || []
            }));
          } else {
            console.error('Failed to fetch logged-in user friends:', response.status, await response.text());
          }
        } catch (error) {
          console.error('Error fetching logged-in user friends:', error);
        }
      } else {
        setLoggedInUser(storedUser);
      }
    };

    const fetchUserData = async () => {
      setIsLoading(true);
      let userId = id ? parseInt(id) : storedUser?.id;

      if (!userId && !storedUser) {
        console.error('Fallback random userId used');
        userId = Math.floor(Math.random() * 3) + 1;
      }

      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        // Fetch specific user
        const userResponse = await fetch(`/api/users/${userId}`);
        if (!userResponse.ok) throw new Error('User not found');
        const userData = await userResponse.json();
        setUser(userData);

        // Fetch user's projects
        const projectsResponse = await fetch(`/api/projects?creatorId=${userData.id}`);
        if (!projectsResponse.ok) throw new Error('Failed to fetch projects');
        const projectsData = await projectsResponse.json();
        setUserProjects(projectsData);

        // Fetch friend data
        const friendsResponse = await fetch(`/api/friends/${userData.id}`);
        if (!friendsResponse.ok) throw new Error('Failed to fetch friends');
        const friendData = await friendsResponse.json();
        console.log('Friend data:', friendData);

        // Fetch friend details using IDs
        if (friendData.friends && friendData.friends.length > 0) {
          const friendIds = friendData.friends.join(',');
          const usersResponse = await fetch(`/api/users?ids=${friendIds}`);
          if (!usersResponse.ok) throw new Error('Failed to fetch friend users');
          const friendUsers = await usersResponse.json();
          setFriends(friendUsers);
        } else {
          setFriends([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLoggedInUserFriends();
    fetchUserData();
  }, [id]);

  const refetchFriends = async () => {
    if (!user?.id) return;
    try {
      const friendsResponse = await fetch(`/api/friends/${user.id}`);
      if (!friendsResponse.ok) throw new Error('Failed to fetch friends');
      const friendData = await friendsResponse.json();

      const allUsersResponse = await fetch('/api/users');
      if (!allUsersResponse.ok) throw new Error('Failed to fetch users');
      const allUsers = await allUsersResponse.json();
      const userFriends = allUsers.filter(u => friendData.friends?.includes(u.id));
      setFriends(userFriends);
    } catch (error) {
      console.error('Error refetching friends:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  const handleProjectCreate = async (newProject) => {
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newProject,
          creatorId: loggedInUser.id,
          isPublic: newProject.isPublic || false,
        }),
      });
      if (!response.ok) throw new Error('Failed to create project');
      const createdProject = await response.json();
      setUserProjects(prev => [...prev, createdProject]);
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const isOwnProfile = loggedInUser && user.id === loggedInUser.id;


  return (
    <>
      <Navbar />
      <div className="profile-page">
        {/* Profile Information */}
        <ProfileComponent user={user} />

        {/* Projects List */}
        <section className="profile-projects">
          <h2>{isOwnProfile ? "My Projects" : `${user.name}'s Projects`}</h2>
          <ProjectList projects={userProjects} />
        </section>

        {/* Friends List*/}
<section className="profile-social">
  <div className="friends-section">
    <div className="friend-heading">
      <h2>{isOwnProfile ? "My Friends" : `${user.name}'s Friends`}</h2>
    </div>
    <FriendList friends={friends} onFriendsUpdate={refetchFriends} />
  </div>

  {isOwnProfile && (
    <div className="requests-section">
      <div className="requests-heading">
        <h2>Friend Requests</h2>
      </div>
      <FriendRequestsSection
        currentUserId={user.id}
        onUpdate={refetchFriends}
      />
    </div>
  )}
</section>

        {/* Create Project Form - Only show for the logged in user */}
        {isOwnProfile && (
          <section className="create-project">
            <h2>Create a New Project</h2>
            <CreateProjectForm onSubmit={handleProjectCreate} />
          </section>
        )}
      </div>
      <PalmTree />
      <Footer />
    </>
  );
};

export default Profile;