import axios from 'axios';

export function getCsrfCookie() {
    return axios.get('http://localhost:8000/api/sunctum/csrf-cookie',{
        withCredentials: true,
    });
}