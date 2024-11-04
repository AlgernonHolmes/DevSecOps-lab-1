import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


import Login from './routes/Login';
import Projects from './routes/Projects';

function App() {
  return (
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/projects" element={<Projects />} />

          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;