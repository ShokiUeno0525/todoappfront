import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm.jsx';

export default function Dashboard() {
  return (
    <div>
      <h1>My ToDo Dashboard</h1>
      <TodoForm />   {/* 追加用フォームコンポーネント */}
      <TodoList />   {/* 上で作った一覧コンポ넌트 */}
    </div>
  );
}