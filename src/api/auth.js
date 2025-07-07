// src/api/auth.js
import API from './api.js';

// ログイン → トークン取得＆保存
export async function handleLogin(email, password) {
  const { data } = await API.post('/login', { email, password });
  localStorage.setItem('token', data.token);
  API.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
  return data;
}

// ユーザー登録
export async function handleRegister(name, email, password, password_confirmation) {
  const { data } = await API.post('/register', { name, email, password, password_confirmation });
  return data;
}

// ログアウト → トークン削除＆ヘッダークリア
export async function handleLogout() {
  const { data } = await API.post('/logout');
  localStorage.removeItem('token');
  delete API.defaults.headers.common['Authorization'];
  return data;
}

// 現在のユーザー情報取得
export async function fetchCurrentUser() {
  const { data } = await API.get('/user');
  return data;
}
