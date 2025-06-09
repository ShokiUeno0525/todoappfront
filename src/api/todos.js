import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
//viteの環境変数でhttp://localhost:8000 などを指定しておくと便利

export function fetchTodos(){
    return axios.get('$API_BASE}/api/todos', {
        withCredentials: true,
    });
}

export function createTodo({ title, description, due_date }) {
    return axios.post(
        '${API_BASE}/api/todos',
        { title, description, due_date },
        { withCredentials: true }
    );
}

export function deleteTodo(id) {
    return axios.delete('${API_BASE}/api/todos/${id}',{
        withCredentials: true,
    });
}