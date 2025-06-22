import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    //viteの環境変数でhttp://localhost:8000 などを指定しておくと便利
});

export default API;

/** タスク一覧取得 */
export function fetchTodos(){
    return API.get('/api/todos');
}

/** タスク作成 */
export function createTodo({ title, description, due_date }){
    return API.post(' /api/todos', { title, description, due_date });
}

/** タスク更新 */
export function updateTodo(id) {
    return API.patch(`/api/todos/${id}`, payload);
}

/** タスク削除 */
export function deleteTodo(id) {
    return API.delete(`/api/todos/${id}`)
}
