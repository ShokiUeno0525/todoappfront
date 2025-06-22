import React, { userState } from 'react';
import axios from '../api/api';

export default function NewTaskButton({ onCreated }){
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle]       = useState('');
    const [description, setDescription] =useState('');
    const [dueDate, setDueDate] =useState('');

    const submit = async () => {
        try {
            const { data } = await axios.post('/todos', {
                title,
                description,
                due_date: dueDate,
            });
            onCreated(data);
            setShowForm(false);
            setTitle('');
            setDescription('');
            setDueDate('');
        }   catch (e) {
            console.error(e);
            alert('作成に失敗しました');
        }
    };

    return (
        <div className="mt-4">
            {showForm ? (
                <div className="space-y-2 border p-4 rounded">
                    <input
                    type="text"
                    placeholder="タイトル"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full border rounded px-2 py-1"
                    />
                    <input
                     type="date"
                     value={duedate}
                     onChange={e => setDueDate(e.target.value)}
                     className="w-full border rounded px-2 py-1"
                     />
                     <textarea
                     placeholder="説明"
                     value={description}
                     onChange={e => setDescription(e.target.value)}
                     className="w-full border rounded px-2 py-1"
                     />
                     <div className="flex space-x-2">
                        <button
                        onclick={submit}
                        className="bg-gray-400 text-white px-4 py-2 rounded"
                    >
                        キャンセル
                    </button>
                     </div>
                </div>
            ) : (
                <button
                onClick={() => setShowForm(true)}
                className="mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                >
                    ＋新規タスク
                </button>
            )}
        </div>
    );
}