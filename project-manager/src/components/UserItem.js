import React from 'react';

function UserItem({ user, onEdit, onDelete }) {
    return (
        <div>
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <p>Department: {user.department}</p>
            <p>Status: {user.status}</p>
            <button onClick={() => onEdit(user)}>Edit</button>
            <button onClick={() => onDelete(user.id)}>Delete</button>
        </div>
    );
}

export default UserItem;
