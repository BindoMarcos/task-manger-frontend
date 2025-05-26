import api from './api';
import { Task } from '../types/Task';

const API = 'http://localhost:8080/api/tareas';

export async function getTasks(): Promise<Task[]> {
  const response = await api.get(API);
  return response.data;
}

export async function getTask(id: number): Promise<Task> {
  const response = await api.get(`${API}/${id}`);
  return response.data;
}

export async function createTask(task: Partial<Task>): Promise<Task> {
  const response = await api.post(API, task);
  return response.data;
}

export async function updateTask(id: number, task: Partial<Task>): Promise<Task> {
  const response = await api.put(`${API}/${id}`, task);
  return response.data;
}

export async function deleteTask(id: number): Promise<void> {
  await api.delete(`${API}/${id}`);
}

