// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  withCredentials: true,  // ← クッキーを含める
  headers: {
    'Content-Type': 'application/json',       // デフォルトヘッダ
  },
});

// 認証トークンをローカルストレージから読み込んで初期セット
const token = localStorage.getItem('token');
if (token) {
  API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default API;

/**　ログイン */
export async function handleLogin(email, password) {
  const { data } = await API.post('/login', {email, password });
  localStorage.setItem('token', data.token);
  API.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
  return data;
}

/** 新規登録 */
export async function handleRegister(name, email, password, password_confirmation) {
  const { data } = await API.post('/register', {
    name, email, password, password_confirmation
  });
  return data;
}

/** ログアウト */
export async function handleLogout() {
  const { data } = await API.post('/logout');
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['Authorization'];
  return data;
}

/** 現在のログインユーザー情報取得 */
export async function fetchCurrentUser() {
  const { data } = await API.get('/user');
  return data;
}
