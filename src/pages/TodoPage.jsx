// src/pages/TodoPage.jsx

import { useState, useEffect } from 'react';
import API from '../api/api';            // axios の baseURL / withCredentials を設定したユーティリティ
import FilterSortBar from '../components/FilterSortBar';
import TaskList       from '../components/TaskList';
import NewTaskButton  from '../components/NewTaskButton';

export default function TodoPage() {
  // タスク配列
  const [tasks, setTasks] = useState([]);
  // 絞り込み: all | pending | done
  const [filterStatus, setFilterStatus] = useState('all');
  // ソートキー: due_date | title | status
  const [sortKey, setSortKey]         = useState('due_date');
  // ソート順: asc | desc
  const [sortOrder, setSortOrder]     = useState('asc');
  // ローディング
  const [loading, setLoading]         = useState(true);
  // エラー
  const [error, setError]             = useState(null);

  // API からタスク一覧を取得
  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        ...(filterStatus !== 'all' ? { status: filterStatus } : {}),
        sort_by: sortKey,
        order:   sortOrder,
      };
      const res = await API.get('/todos', { params });
      setTasks(res.data);
    } catch (e) {
      console.error(e);
      setError('タスクの取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  // マウント時とフィルタ／ソート変更時に再取得
  useEffect(() => {
    fetchTodos();
  }, [filterStatus, sortKey, sortOrder]);

  // 新規作成後にリストを更新するコールバック
  const handleCreated = (newTask) => {
    // 作成後は最新ソート順で再取得するか、単純に先頭に追加
    setTasks((prev) => [newTask, ...prev]);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">タスク一覧</h1>

      <FilterSortBar
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
        sortKey={sortKey}
        onSortKeyChange={setSortKey}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
      />

      {loading && <p>読み込み中…</p>}
      {error   && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <TaskList tasks={tasks} />
      )}

      <NewTaskButton onCreated={handleCreated} />
    </div>
  );
}
