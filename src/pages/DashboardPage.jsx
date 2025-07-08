import { useState, useRef } from "react";
import TodoList from "../components/TaskList";
import NewTaskButton from "../components/NewTaskButton";
import FilterSortBar from "../components/FilterSortBar";
import { handleLogout } from "../api/api";

export default function DashboardPage({ setUser }) {
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortKey, setSortKey] = useState("due_date");
  const [sortOrder, setSortOrder] = useState("asc");
  const todoListRef = useRef();

  const handleTaskCreated = () => {
    // タスクが作成された後にリストを更新
    if (todoListRef.current) {
      todoListRef.current.refreshTasks();
    }
  };

  const handleLogoutClick = async () => {
    try {
      await handleLogout();
      setUser(null);
    } catch (error) {
      console.error("ログアウトエラー:", error);
      alert("ログアウトに失敗しました");
    }
  };

  // ユーザーごとのタスクが props で渡されている想定
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1>ダッシュボード</h1>
        <button
          onClick={handleLogoutClick}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          ログアウト
        </button>
      </div>
      <FilterSortBar
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
        sortKey={sortKey}
        onSortKeyChange={setSortKey}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
      />
      <TodoList ref={todoListRef} /* tasks={…} など */ />
      <NewTaskButton onCreated={handleTaskCreated} />
    </div>
  );
}
