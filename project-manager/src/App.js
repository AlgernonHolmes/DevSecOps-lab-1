import React, { useState, useEffect } from 'react';
import { fetchProjects, createProject, updateProject, deleteProject } from './api';
import { fetchUsers, createUser, updateUser, deleteUser } from './api';
import ProjectList from './components/ProjectList';
import ProjectForm from './components/ProjectForm';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

function App() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchProjects().then(setProjects);
    }, []);

    useEffect(() => {
        fetchUsers().then(setUsers);
    } ,[]);

    const handleCreate = async (data) => {
        const newProject = await createProject(data);
        setProjects([...projects, newProject]);
    };

    const handleCreateUser = async (data) => {
        const newUser = await createUser(data);
        setUsers([...users, newUser]);
    }

    const handleUpdate = async (id, data) => {
        const updatedProject = await updateProject(id, data);
        setProjects(projects.map(p => p.id === id ? updatedProject : p));
    };

    const handleUpdateUser = async (id, data) => {
        const updatedUser = await updateUser(id, data);
        setUsers(users.map(u => u.id === id ? updatedUser : u));
    }

    const handleDelete = async (id) => {
        await deleteProject(id);
        setProjects(projects.filter(p => p.id !== id));
    };

    const handleDeleteUser = async (id) => {
        await deleteUser(id);
        setUsers(users.filter(u => u.id !== id));
    }


    return (
        <>
            <div>
                <h1>Project Manager</h1>
                <ProjectForm 
                    onSubmit={selectedProject ? handleUpdate : handleCreate} 
                    project={selectedProject}
                    setSelectedProject={setSelectedProject}
                />
                <ProjectList 
                    projects={projects} 
                    onEdit={setSelectedProject} 
                    onDelete={handleDelete} 
                />
            </div>

            <div>
                <h1>User Manager</h1>
                <UserForm 
                    onSubmit={selectedUser ? handleUpdateUser : handleCreateUser} 
                    user={selectedUser}
                    setSelectedUser={setSelectedUser}
                />
                <UserList 
                    users={users} 
                    onEdit={setSelectedUser} 
                    onDelete={handleDeleteUser} 
                />
            </div>  
        </>
        
    );
}

export default App;
