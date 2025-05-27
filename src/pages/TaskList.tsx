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
import TaskPagination from '../components/Pagination';

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filtro, setFiltro] = useState<'todas' | 'completadas' | 'pendientes'>('todas');
  const [fechaDesde, setFechaDesde] = useState<string>('');
  const [fechaHasta, setFechaHasta] = useState<string>('');
  const [currentUserMail, setCurrentUserMail] = useState<String>('');
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 6;
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

  useEffect(() => {
    setPage(1);
  }, [filtro, fechaDesde, fechaHasta]);

  const handleReset = () => {
    setFiltro('todas');
    setFechaDesde('');
    setFechaHasta('');
    setPage(1);
  };

  const filtradas = tasks.filter(task => {
    const okEstado =
      filtro === 'completadas' ? task.completada :
      filtro === 'pendientes' ? !task.completada : true;
    const okDesde = !fechaDesde || task.fecha >= fechaDesde;
    const okHasta = !fechaHasta || task.fecha <= fechaHasta;
    return okEstado && okDesde && okHasta;
  });

  const indexOfLast = page * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentTasks = filtradas.slice(indexOfFirst, indexOfLast);

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    cargarTareas();
  };

  return (
    <Container
      maxWidth="lg"
      disableGutters
      sx={{ px: { xs: 1, sm: 2, md: 3 }, py: { xs: 2, sm: 3 } }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography
          variant="h5"
          sx={{
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
            textAlign: { xs: 'center', sm: 'left' },
            mb: { xs: 2, sm: 0 }
          }}
        >
          Tareas
        </Typography>

        <Stack direction="row" spacing={1}>
          <Button variant="contained" onClick={() => navigate('/nueva')}>
            Nueva Tarea
          </Button>
          <LogoutButton />
        </Stack>
      </Stack>

      <Paper elevation={1} sx={{ p: 2, mb: 4 }}>
        <Grid
          container
          spacing={2}
          wrap="wrap"
          alignItems="center"
          justifyContent={{ xs: 'center', sm: 'space-between' }}
        >
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
                  textTransform: 'none',
                  fontSize: { xs: '0.75rem', sm: '0.875rem' }
                }
              }}
            >
              <ToggleButton value="todas">Todas</ToggleButton>
              <ToggleButton value="completadas">Completadas</ToggleButton>
              <ToggleButton value="pendientes">Pendientes</ToggleButton>
            </ToggleButtonGroup>
          </Grid>

          <Grid item xs={12} sm={2} textAlign="right">
            <IconButton size="small" onClick={handleReset}>
              <Delete fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>

      <List>
        {currentTasks.map(task => (
          <ListItem
            key={task.id}
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'flex-start', sm: 'center' },
              py: 1
            }}
          >
            <ListItemText
              primary={task.titulo}
              secondary={`${task.descripcion} • ${task.completada ? '✅ Completada' : '❌ Pendiente'} • ${task.fecha ? task.fecha : "Sin fecha"}`}
              sx={{ width: { xs: '100%', sm: 'auto' } }}
            />

            {task.creador === currentUserMail && (
              <Stack
                direction="row"
                spacing={1}
                sx={{ mt: { xs: 1, sm: 0 }, ml: { sm: 'auto' } }}
              >
                <IconButton size="small" onClick={() => navigate(`/editar/${task.id}`)}>
                  <Edit fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => handleDelete(task.id!)}>
                  <Delete fontSize="small" />
                </IconButton>
              </Stack>
            )}
          </ListItem>
        ))}
      </List>

      {currentTasks.length !== 0 ? (
        <TaskPagination
          totalItems={filtradas.length}
          itemsPerPage={itemsPerPage}
          currentPage={page}
          onPageChange={setPage}
        />
      ) : (
        <Typography textAlign="center">No se encontraron tareas</Typography>
      )}
    </Container>
  );
}
