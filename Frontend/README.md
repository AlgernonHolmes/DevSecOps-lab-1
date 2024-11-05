# SwiftAura Frontend

This is the frontend for the SwiftAura DevSecOps workshop project. Built with React, Vite, and Material UI, it serves as the user interface for interacting with the backend API.

## Tech Stack
- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool for modern web projects.
- **Material UI (MUI 3)**: A React component library following Material Design principles, used for styling and UI components.
- **React Router**: For handling client-side routing.

## Project Structure
The project is organized as follows:

Frontend

├── node_modules (ignored by .gitignore)
├── src
│   ├── assets
│   │   │   ├── librosBackground.jpg
│   ├── components
│   │   └── NavBar.jsx
│   ├── routes
│   │   ├── Login.jsx
│   │   └── Projects.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── vercel.json
└── vite.config.js


## Getting Started

### Prerequisites
- Node.js (v14+ recommended)
- npm

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/AlgernonHolmes/DevSecOps-lab-1.git
    cd <repository-directory>
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Modify the endpoints in the routes file to `localhost` for local testing.

### Run and Build the Project

1. **Running the Project**
    ```bash
    npm run dev
    ```

2. **Build for Production**
    ```bash
    npm run build
    ```

### Deployment

Once the build is complete, you can deploy the contents of the dist folder to any static site hosting provider.

### Additional Notes

This frontend application is designed for use in a DevSecOps workshop and is intentionally connected to a vulnerable backend to demonstrate security testing techniques. Please use responsibly.
