import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { login } from '../services/auth';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (error) setError('');
  };

  const handleSubmit = async () => {
    setError('');
    try {
      await login(form.email, form.password);
      window.location.href = '/tareas';
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleRedirectToRegister = () => {
    window.location.href = '/registro';
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>Login</Typography>
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
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}

      <Box mt={2}>
        <Button variant="contained" fullWidth onClick={handleSubmit}>Ingresar</Button>
      </Box>
      <Box mt={1}>
        <Button variant="text" fullWidth onClick={handleRedirectToRegister}>
          ¿No tenés una cuenta? Registrate acá
        </Button>
      </Box>
    </Container>
  );
}
