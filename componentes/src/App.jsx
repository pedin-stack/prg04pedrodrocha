import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Treasury from './pages/Treasury';
import User from './pages/User';
import Login from './pages/Login';
import Events from './pages/Events';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} /> {/*O caminho 'coringa' é o dashboard*/}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/events" element={<Events />} />
        <Route path="/tesouraria" element={<Treasury />} />
        <Route path="/users" element={<User />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>  
  );
}
