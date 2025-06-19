// src/api.js
import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

axios.defaults.headers.common['Content-Type'] = 'application/json';
const token = localStorage.getItem('token');
if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export async function handleLogin(email, password) {
  const { data } = await axios.post(
    `${API_BASE}/login`,
    { email, password }
  );
  localStorage.setItem('token', data.token);
  axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
  return data;
}

export async function handleRegister(name, email, password, password_confirmation) {
  const { data } = await axios.post(
    `${API_BASE}/register`,
    { name, email, password, password_confirmation }
  );
  return data;
}

export async function handleLogout() {
  const { data } = await axios.post(`${API_BASE}/logout`);
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['Authorization'];
  return data;
}

export async function fetchCurrentUser() {
  const { data } = await axios.get(`${API_BASE}/user`);
  return data;
}
