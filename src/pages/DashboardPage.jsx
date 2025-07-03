import {useState} from 'react'
import TodoList       from '../components/TaskList'
import NewTaskButton  from '../components/NewTaskButton'
import FilterSortBar  from '../components/FilterSortBar'

export default function DashboardPage({ setUser }) {
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortKey, setSortKey] = useState('due_date');
  const [sortOrder, setSortOrder] = useState('asc');

  // ユーザーごとのタスクが props で渡されている想定
  return (
    <div>
      <h1>ダッシュボード</h1>
      <FilterSortBar
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
        sortKey={sortKey}
        onSortKeyChange={setSortKey}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
      />
      <TodoList /* tasks={…} など */ />
      <NewTaskButton /* onCreated={…} */ />
    </div>
  )
}