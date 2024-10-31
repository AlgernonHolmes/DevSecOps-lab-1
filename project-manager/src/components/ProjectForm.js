import React, { useState, useEffect } from 'react';
import { fetchUsers } from '../api';

function ProjectForm({ onSubmit, project, setSelectedProject }) {
    const [form, setForm] = useState({
        name: '',
        technologies: '',
        supervisor_id: '',
        description: ''
    });
    const [supervisors, setSupervisors] = useState([]);

    useEffect(() => {
        fetchUsers().then(setSupervisors);  // Carga los supervisores al inicio
        if (project) setForm(project);
    }, [project]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
        setForm({ name: '', technologies: '', supervisor_id: '', description: '' });
        setSelectedProject(null);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
            <input name="technologies" value={form.technologies} onChange={handleChange} placeholder="Technologies" />
            <select name="supervisor_id" value={form.supervisor_id} onChange={handleChange}>
                <option value="">Select Supervisor</option>
                {supervisors.map((supervisor) => (
                    <option key={supervisor.id} value={supervisor.id}>
                        {supervisor.name}
                    </option>
                ))}
            </select>
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
            <button type="submit">Submit</button>
        </form>
    );
}

export default ProjectForm;
