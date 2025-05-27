import React, { useEffect, useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Container, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { createTask, getTask, updateTask } from '../services/task';
import { Task } from '../types/Task';

export default function TaskForm() {
  const { id } = useParams();
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [completada, setCompletada] = useState(false);
  const [creador, setCreador] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getTask(Number(id)).then((task: Task) => {
        setTitulo(task.titulo);
        setDescripcion(task.descripcion!);
        setFecha(task.fecha);
        setCompletada(task.completada);
        setCreador(task.creador);
      });
    }
  }, [id]);

  const handleSubmit = async () => {
    const task: Task = { titulo, descripcion, completada, fecha, creador };
    if (id) {
      await updateTask(Number(id), task);
    } else {
      await createTask(task);
    }
    navigate('/tareas');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant='h5'>{id ? 'Editar Tarea' : 'Crear Nueva Tarea'}</Typography>
      <TextField fullWidth label="Título" value={titulo} onChange={e => setTitulo(e.target.value)} margin="normal" />
      <TextField fullWidth label="Descripción" value={descripcion} onChange={e => setDescripcion(e.target.value)} margin="normal" />
      <TextField fullWidth type="date" value={fecha} onChange={e => setFecha(e.target.value)} margin="normal" />
      { id && <FormControlLabel
        control={<Checkbox checked={completada} onChange={e => setCompletada(e.target.checked)} />}
        label="Completada"
      />}
      <Button variant="contained" onClick={handleSubmit}>Guardar</Button>
    </Container>
  );
}
