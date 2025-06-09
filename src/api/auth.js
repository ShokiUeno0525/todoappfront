import axios from 'axios';
import { getCsrfCookie } from './csrf';

const API_BASE = 'http://localhost:8000/api';

export async function handleLogin(email,password) {
    await getCsrfCookie(); //先にCSRF　Cookieを取得
    const response = await axios.post(
        '${API_BASE}/login',
        {email,password},
    {withCredentials: true}
   );
   return response.data;
}

export async function handleRegister(name, email, password, password_confirmation) {
    await getCsrfCookie();
    const response =await axios.post(
        '${API_BASE}/register',
        { withCredentials: true}
    );
    return response.data;
}

export async function handleLogout() {
    await getCsrfCookie();
    const response =await axios.post(
        '${API_BASE}/logout',
        {},
        { withCredentials: true}
    );
    return response.data;
}

export async function fetchCurrentUser() {
    await getCsrfCookie();
    const response = await axios.get(
        '${API_BASE}/user',
        { withCredentials: true}
    );
    return response.data;
}
