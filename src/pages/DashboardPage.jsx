import { useState, useRef } from "react";
import TaskList from "../components/TaskList";
import { handleLogout } from "../api/api";
import { createTodo } from "../api/todos";

// コンポーネントのプレースホルダー
const TodoListPlaceholder = ({ filterStatus, sortKey, sortOrder }) => {
  return (
    <div style={{ padding: "24px", textAlign: "center", color: "#6b7280" }}>
      <h3>TodoList Component</h3>
      <p>Filter: {filterStatus}</p>
      <p>
        Sort: {sortKey} ({sortOrder})
      </p>
      <p>実際のタスクデータがここに表示されます</p>
    </div>
  );
};

const NewTaskButtonLocal = ({ onTaskCreated }) => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  const buttonStyle = {
    padding: "12px 24px",
    backgroundColor: "#3b82f6",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  const formStyle = {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "1000",
  };

  const modalStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "32px",
    width: "90%",
    maxWidth: "500px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    border: "2px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "16px",
    marginBottom: "16px",
    boxSizing: "border-box",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("タスクタイトルを入力してください");
      return;
    }

    setLoading(true);
    try {
      await createTodo({
        title: title.trim(),
        description: description.trim(),
        due_date: dueDate,
      });

      // フォームをリセット
      setTitle("");
      setDescription("");
      setDueDate("");
      setShowForm(false);

      // 親コンポーネントに通知
      onTaskCreated && onTaskCreated();
    } catch (error) {
      console.error("タスク作成エラー:", error);
      alert("タスクの作成に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        style={buttonStyle}
        onClick={() => setShowForm(true)}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = "#2563eb";
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = "#3b82f6";
        }}
      >
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
        New Task
      </button>

      {showForm && (
        <div style={formStyle} onClick={() => setShowForm(false)}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <h3
              style={{
                marginTop: "0",
                marginBottom: "24px",
                fontSize: "20px",
                fontWeight: "600",
              }}
            >
              新しいタスクを作成
            </h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="タスクタイトル"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={inputStyle}
                disabled={loading}
              />
              <textarea
                placeholder="説明（任意）"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ ...inputStyle, height: "100px", resize: "vertical" }}
                disabled={loading}
              />
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                style={inputStyle}
                disabled={loading}
              />
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  style={{
                    padding: "12px 24px",
                    backgroundColor: "#6b7280",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                  disabled={loading}
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "12px 24px",
                    backgroundColor: "#3b82f6",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? "0.6" : "1",
                  }}
                  disabled={loading}
                >
                  {loading ? "作成中..." : "作成"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

const FilterSortBarLocal = ({
  filterStatus,
  setFilterStatus,
  sortKey,
  setSortKey,
  sortOrder,
  setSortOrder,
}) => {
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap",
  };

  const selectStyle = {
    padding: "8px 12px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    fontSize: "14px",
    backgroundColor: "#ffffff",
    color: "#374151",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      {/* フィルター */}
      <div>
        <label
          style={{ fontSize: "14px", color: "#374151", marginRight: "8px" }}
        >
          Filter:
        </label>
        <select
          style={selectStyle}
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>

      {/* ソート */}
      <div>
        <label
          style={{ fontSize: "14px", color: "#374151", marginRight: "8px" }}
        >
          Sort by:
        </label>
        <select
          style={selectStyle}
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
        >
          <option value="due_date">Due Date</option>
          <option value="created_at">Created Date</option>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>

      {/* ソート順 */}
      <div>
        <select
          style={selectStyle}
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
};

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

  // スタイル定義
  const containerStyle = {
    minHeight: "100vh",
    backgroundColor: "#f9fafb",
    fontFamily: '"Inter", "Segoe UI", "Roboto", sans-serif',
    display: "flex",
    flexDirection: "column",
    margin: "0",
    padding: "0",
    boxSizing: "border-box",
    width: "100%",
  };

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 24px",
    borderBottom: "1px solid #e5e7eb",
    backgroundColor: "#ffffff",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  };

  const logoStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    color: "#111827",
  };

  const titleStyle = {
    fontSize: "20px",
    fontWeight: "700",
    margin: "0",
    color: "#111827",
    lineHeight: "1.2",
  };

  const userSectionStyle = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  };

  const logoutButtonStyle = {
    padding: "8px 16px",
    backgroundColor: "#ef4444",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s",
  };

  const mainStyle = {
    flex: "1",
    padding: "24px",
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
  };

  const welcomeHeaderStyle = {
    marginBottom: "32px",
  };

  const welcomeTitleStyle = {
    fontSize: "32px",
    fontWeight: "800",
    color: "#111827",
    marginBottom: "8px",
  };

  const welcomeSubtitleStyle = {
    fontSize: "16px",
    color: "#6b7280",
  };

  const controlsStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "24px",
    flexWrap: "wrap",
    gap: "16px",
  };

  const taskListContainerStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
    border: "1px solid #e5e7eb",
    overflow: "hidden",
  };

  const taskListHeaderStyle = {
    padding: "20px 24px",
    borderBottom: "1px solid #e5e7eb",
    backgroundColor: "#f8fafc",
  };

  const taskListTitleStyle = {
    fontSize: "18px",
    fontWeight: "600",
    color: "#111827",
    margin: "0",
  };

  const taskListContentStyle = {
    padding: "0",
  };

  return (
    <div style={containerStyle}>
      {/* ヘッダー */}
      <header style={headerStyle}>
        <div style={logoStyle}>
          <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
            <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="#111827" />
          </svg>
          <h1 style={titleStyle}>TaskMaster</h1>
        </div>
        <div style={userSectionStyle}>
          <span style={{ color: "#6b7280", fontSize: "14px" }}>
            Welcome back!
          </span>
          <button
            style={logoutButtonStyle}
            onClick={handleLogoutClick}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#dc2626";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#ef4444";
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main style={mainStyle}>
        {/* ウェルカムセクション */}
        <div style={welcomeHeaderStyle}>
          <h2 style={welcomeTitleStyle}>Dashboard</h2>
          <p style={welcomeSubtitleStyle}>
            Manage your tasks and stay organized
          </p>
        </div>

        {/* コントロールバー */}
        <div style={controlsStyle}>
          {/* FilterSortBarコンポーネントを使用 */}
          <FilterSortBarLocal
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            sortKey={sortKey}
            setSortKey={setSortKey}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />

          {/* NewTaskButtonコンポーネントを使用 */}
          <NewTaskButtonLocal onTaskCreated={handleTaskCreated} />
        </div>

        {/* タスクリスト */}
        <div style={taskListContainerStyle}>
          <div style={taskListHeaderStyle}>
            <h3 style={taskListTitleStyle}>Your Tasks</h3>
          </div>
          <div style={taskListContentStyle}>
            {/* TaskListコンポーネントを使用 */}
            <TaskList
              ref={todoListRef}
              filterStatus={filterStatus}
              sortKey={sortKey}
              sortOrder={sortOrder}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
