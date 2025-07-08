import API from './api.js';

/** タスク一覧取得 */
export function fetchTodos(){
    return API.get('/todos');
}

/** タスク作成 */
export function createTodo({ title, description, due_date }){
    return API.post('/todos', { title, description, due_date });
}

/** タスク更新 */
export function updateTodo(id, payload) {
    return API.patch(`/todos/${id}`, payload);
}

/** タスク削除 */
export function deleteTodo(id) {
    return API.delete(`/todos/${id}`)
}
