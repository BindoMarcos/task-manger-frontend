
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import TaskList from './TaskList';
import TaskForm from './TaskForm';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registro" element={<Register />} />
      <Route path="/tareas" element={<TaskList />} />
      <Route path="/nueva" element={<TaskForm />} />
      <Route path="/editar/:id" element={<TaskForm />} />
    </Routes>
  );
}
