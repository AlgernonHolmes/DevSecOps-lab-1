import React from 'react';

function ProjectItem({ project, onEdit, onDelete }) {
    return (
        <div>
            <h3>{project.name}</h3>
            <p>{project.technologies}</p>
            <p>{project.supervisor}</p>
            <p>{project.description}</p>
            <button onClick={() => onEdit(project)}>Edit</button>
            <button onClick={() => onDelete(project.id)}>Delete</button>
        </div>
    );
}

export default ProjectItem;
