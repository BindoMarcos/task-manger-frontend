import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask } from '../services/task';
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
  Box,
  Stack,
  IconButton,
  Paper,
  Grid,
  TextField
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import { Task } from '../types/Task';
import LogoutButton from '../components/LogOut';
import { getUserMail } from '../services/user';

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filtro, setFiltro] = useState<'todas' | 'completadas' | 'pendientes'>('todas');
  const [fechaDesde, setFechaDesde] = useState<string>('');
  const [fechaHasta, setFechaHasta] = useState<string>('');
  const [currentUserMail, setCurrentUserMail] = useState<String>('');
  const navigate = useNavigate();

  const cargarTareas = async () => {
    const datos = await getTasks();
    const userMail = await getUserMail();
    setTasks(datos);
    setCurrentUserMail(userMail);
  };

  useEffect(() => {
    cargarTareas();
  }, []);

  const handleReset = () => {
    setFiltro('todas');
    setFechaDesde('');
    setFechaHasta('');
  };

  const filtradas = tasks.filter(task => {
    const okEstado =
      filtro === 'completadas' ? task.completada :
        filtro === 'pendientes' ? !task.completada : true;
    const okDesde = !fechaDesde || task.fecha >= fechaDesde;
    const okHasta = !fechaHasta || task.fecha <= fechaHasta;
    return okEstado && okDesde && okHasta;
  });

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    cargarTareas();
  };

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5">Tareas</Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="contained" onClick={() => navigate('/nueva')}>Nueva Tarea</Button>
          <LogoutButton />
        </Stack>
      </Stack>
      <Paper elevation={1} sx={{ p: 2, mb: 4 }}>
        <Grid container spacing={2} alignItems="center" direction='row'>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Desde"
              type="date"
              variant="outlined"
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={fechaDesde}
              onChange={e => setFechaDesde(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Hasta"
              type="date"
              variant="outlined"
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={fechaHasta}
              onChange={e => setFechaHasta(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <ToggleButtonGroup
              value={filtro}
              exclusive
              onChange={(_, val) => val && setFiltro(val)}
              fullWidth
              sx={{
                '& .MuiToggleButton-root': {
                  flex: 1,
                  textTransform: 'none'
                }
              }}
            >
              <ToggleButton value="todas">Todas</ToggleButton>
              <ToggleButton value="completadas">Completadas</ToggleButton>
              <ToggleButton value="pendientes">Pendientes</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid xs={12} sm={2} textAlign='right'>
            <IconButton size="small" onClick={handleReset}>
              <Delete />
            </IconButton>
          </Grid>
        </Grid>

      </Paper>
      <List>
        {filtradas.map(task => (
          <ListItem key={task.id} sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <ListItemText
              primary={task.titulo}
              secondary={`${task.descripcion} • ${task.completada ? '✅ Completada' : '❌ Pendiente'} • ${task.fecha}`}
            />
            {task.creador === currentUserMail && (
              <Stack direction="row" spacing={1}>
                <IconButton onClick={() => navigate(`/editar/${task.id}`)}><Edit /></IconButton>
                <IconButton onClick={() => handleDelete(task.id!)}><Delete /></IconButton>
              </Stack>
            )}
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
