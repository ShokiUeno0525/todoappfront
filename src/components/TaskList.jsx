import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { fetchTodos, deleteTodo, updateTodo } from "../api/todos";

const TodoList = forwardRef((props, ref) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTodos = () => {
    setLoading(true);
    fetchTodos()
      .then((res) => setTodos(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadTodos();
  }, []);

  useImperativeHandle(ref, () => ({
    refreshTasks: loadTodos
  }));

  const handleToggleComplete = (todo) => {
    updateTodo(todo.id, { is_completed: !todo.is_completed }).then((res) => {
      setTodos((ts) => ts.map((t) => (t.id === todo.id ? res.data : t)));
    });
  };

  const handleDelete = (id) => {
    deleteTodo(id).then(() => {
      setTodos((ts) => ts.filter((t) => t.id !== id));
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.is_completed}
            onChange={() => handleToggleComplete(todo)}
          />
          {todo.title} ({new Date(todo.due_date).toLocaleDateString()})
          <button onClick={() => handleDelete(todo.id)}>削除</button>
        </li>
      ))}
    </ul>
  );
});

export default TodoList;
