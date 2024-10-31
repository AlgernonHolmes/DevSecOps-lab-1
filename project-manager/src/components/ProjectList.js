import React from 'react';
import ProjectItem from './ProjectItem';

function ProjectList({ projects, onEdit, onDelete }) {
    return (
        <div>
            {projects.map(project => (
                <ProjectItem 
                    key={project.id} 
                    project={project} 
                    onEdit={onEdit} 
                    onDelete={onDelete} 
                />
            ))}
        </div>
    );
}

export default ProjectList;
