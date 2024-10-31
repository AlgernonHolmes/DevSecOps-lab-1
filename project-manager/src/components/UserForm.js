import React, { useState, useEffect } from 'react';

function UserForm({ onSubmit, user, setSelectedUser }) {
    const [form, setForm] = useState({
        name: '',
        email: '',
        role: '',
        department: '',
        status: 'Active'
    });

    useEffect(() => {
        if (user) setForm(user);
    }, [user]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
        setForm({ name: '', email: '', role: '', department: '', status: 'Active' });
        setSelectedUser(null);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
            <input name="role" value={form.role} onChange={handleChange} placeholder="Role" />
            <input name="department" value={form.department} onChange={handleChange} placeholder="Department" />
            <select name="status" value={form.status} onChange={handleChange}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
            </select>
            <button type="submit">Submit</button>
        </form>
    );
}

export default UserForm;
