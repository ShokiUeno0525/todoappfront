import React from 'react';

export default function FilterSortBar({
    filterStatus, onFilterChange,
    sortKey, onSortKeyChange,
    sortOrder, onSortOrderChange,
}) {
    return (
        <div className="flex gap-4 mb-4">
            {/* ステータス絞り込み */}
            <select
            value={filterStatus}
            onChange={e => onFilterChange(e.target.value)}
            className="border px-2 py-1 rounded"
            >
                <option value="all">すべて</option>
                <option value="pending">未完了</option>
                <option value="done">完了</option>
            </select>

            {/* ソートキー */}
            <select
            value={sortKey}
            onChange={e => onSortKeyChange(e.target.value)}
            className="border px-2 py-1 rounded"
            >
                <option value="due_date">期限順</option>
                <option value="title">タイトル順</option>
                <option value="status">状態順</option>
            </select>
            
            {/* ソート順 */}
            <select
            value={sortOrder}
            onChange={e => onSortOrderChange(e.target.value)}
            className="border px-2 py-1 rounded"
            >
                <option value="asc">昇順</option>
                <option value="desc">降順</option>
            </select>
        </div>
    );
}