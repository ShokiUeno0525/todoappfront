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
  return (
    <div className="min-h-screen bg-gray-100">
      {/* ヘッダー */}
      <header className="bg-white shadow-md">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-gray-800">タスク管理</h1>
          <button
            onClick={handleLogoutClick}
            className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl shadow-sm transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="font-medium">ログアウト</span>
          </button>
        </div>
      </header>

      {/* メイン */}
      <main className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* フィルター／ソート */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <FilterSortBar
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            sortKey={sortKey}
            setSortKey={setSortKey}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
        </div>

        {/* 新規タスク */}
        <div className="flex justify-end">
          <NewTaskButton onCreated={handleTaskCreated} />
        </div>

        {/* タスク一覧 */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
          <TodoList
            ref={todoListRef}
            filterStatus={filterStatus}
            sortKey={sortKey}
            sortOrder={sortOrder}
          />
        </div>
      </main>
    </div>
  );
}
