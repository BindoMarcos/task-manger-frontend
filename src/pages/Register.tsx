import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { register } from '../services/auth';

export default function Register() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (error) setError('');
  };

  const handleRedirectToLogin = () => {
    window.location.href = '/';
  };

  const handleSubmit = async () => {
    setError('');
    try {
      await register(form.email, form.password);
      window.location.href = '/tareas';
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5">Registrarse</Typography>
      <TextField
        fullWidth
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        margin="normal"
      />
      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 1, mb: 1 }}>
          {error}
        </Typography>
      )}

      <Box mt={1} display="flex" gap={2} >
        <Button variant="contained" onClick={handleSubmit}>
          Crear cuenta
        </Button>
        {error && (
          <Button variant="contained" onClick={handleRedirectToLogin}>
            Logueate
          </Button>
        )}
      </Box>

    </Container>
  );
}
