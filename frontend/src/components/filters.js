import React from "react";

const Filters = ({ filters, setFilters, searchType, setSearchType }) => {
  const { timeCreated, visibility, hashtag } = filters;

  return (
    <div className="filter-options">
      {/* Search Type Dropdown */}
      <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
        <option value="projects">Projects</option>
        <option value="users">Users</option>
        <option value="messages">Check-in Messages</option>
      </select>
      
      {/* Time Created Dropdown */}
      <select value={timeCreated} onChange={(e) => setFilters({ ...filters, timeCreated: e.target.value })}>
        <option value="">Sort by Time Created</option>
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>

      {/* Public / Private Dropdown - Only show for projects */}
      {searchType === "projects" && (
        <select value={visibility} onChange={(e) => setFilters({ ...filters, visibility: e.target.value })}>
          <option value="">Filter by Visibility</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      )}

      {/* Hashtag Dropdown - Only show for projects */}
      {searchType === "projects" && (
        <select value={hashtag} onChange={(e) => setFilters({ ...filters, hashtag: e.target.value })}>
          <option value="">Filter by Hashtag</option>
          <option value="#react">#React</option>
          <option value="#javascript">#JavaScript</option>
          <option value="#webdev">#WebDev</option>
        </select>
      )}
    </div>
  );
};

export default Filters;