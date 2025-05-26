import api from './api';

const API = 'http://localhost:8080/api/usuario';

export async function getUserMail(): Promise<String> {
    const response = await api.get(API);
    return response.data;
}