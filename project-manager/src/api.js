const API_URL = "http://localhost:5000/projects";
const USERS_API_URL = "http://localhost:5000/users";

// Usuarios
export async function fetchUsers() {
    const response = await fetch(USERS_API_URL);
    if (!response.ok) {
        throw new Error(`Error fetching users: ${response.statusText}`);
    }
    return response.json();
}

export async function createUser(data) {
    const response = await fetch(USERS_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error(`Error creating user: ${response.statusText}`);
    }
    return response.json();
}

export async function updateUser(id, data) {
    const response = await fetch(`${USERS_API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error(`Error updating user: ${response.statusText}`);
    }
    return response.json();
}

export async function deleteUser(id) {
    const response = await fetch(`${USERS_API_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) {
        throw new Error(`Error deleting user: ${response.statusText}`);
    }
}

// Proyectos
export async function fetchProjects() {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error(`Error fetching projects: ${response.statusText}`);
    }
    return response.json();
}

export async function createProject(data) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...data,
            supervisor_id: data.supervisor_id ? Number(data.supervisor_id) : null,
        }),
    });
    if (!response.ok) {
        throw new Error(`Error creating project: ${response.statusText}`);
    }
    return response.json();
}

export async function updateProject(id, data) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error(`Error updating project: ${response.statusText}`);
    }
    return response.json();
}

export async function deleteProject(id) {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) {
        throw new Error(`Error deleting project: ${response.statusText}`);
    }
}
