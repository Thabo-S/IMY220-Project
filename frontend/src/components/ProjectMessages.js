import React from 'react';

const ProjectMessages = ({ messages }) => {
    return (
        <section className="project-messages">
            <h3>Activity Messages</h3>
            {messages.map(message => (
                <article key={message.id} className="message">
                    <strong>{message.user?.name || 'Unknown User'}:</strong> {message.text}
                    <time>{message.time}</time>
                </article>
            ))}
        </section>
    );
};

export default ProjectMessages;