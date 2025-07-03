// src/api.js
import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

// JSON を送る＆受け取る
axios.defaults.headers.common['Content-Type'] = 'application/json';

// アプリ起動時に localStorage の token があればセット
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// ログイン → トークン取得＆保存
export async function handleLogin(email, password) {
  const { data } = await axios.post(
    `${API_BASE}/login`,
    { email, password }
  );
  // data.token にアクセストークンが入っている想定
  localStorage.setItem('token', data.token);
  axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
  return data;
}

// ユーザー登録
export async function handleRegister(name, email, password, password_confirmation) {
  const { data } = await axios.post(
    `${API_BASE}/register`,
    { name, email, password, password_confirmation }
  );
  return data;
}

// ログアウト → トークン削除＆ヘッダークリア
export async function handleLogout() {
  const { data } = await axios.post(
    `${API_BASE}/logout`
  );
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['Authorization'];
  return data;
}

// 現在のユーザー情報取得
export async function fetchCurrentUser() {
  const { data } = await axios.get(
    `${API_BASE}/user`
  );
  return data;
}
