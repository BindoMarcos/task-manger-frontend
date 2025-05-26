
import api from './api';

const API = 'http://localhost:8080/api/auth';

export async function login(email: string, password: string) {
  const response = await api.post(API + '/login', { email, password });

  const token = response.data;
  if (token) {
    sessionStorage.setItem('token', token);
  }

  return response.data;
}

export async function register(email: string, password: string) {
  const response = await api.post(API + '/register', { email, password });
  return response.data;
}

