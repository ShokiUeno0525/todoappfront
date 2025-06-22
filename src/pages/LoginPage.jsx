// src/pages/LoginPage.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/api'; // baseURL と withCredentials を設定済みとする

export default function LoginPage() {
  const navigate = useNavigate();

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState(null);
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await axios.post('/login', { email, password });
      const token = res.data.token;

      // 1) トークンを localStorage に保存
      localStorage.setItem('apiToken', token);

      // 2) axios の Authorization ヘッダをデフォルト設定
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // 3) ログイン後はタスク一覧へリダイレクト
      navigate('/todos');
    } catch (e) {
      console.error(e);
      setError(
        e.response?.status === 401
          ? 'メールアドレスかパスワードが正しくありません'
          : 'ログインに失敗しました'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ログイン</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">メールアドレス</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full border px-2 py-1 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">パスワード</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full border px-2 py-1 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'ログイン中…' : 'ログイン'}
        </button>
      </form>
      <p className="mt-4 text-center">
  アカウントをお持ちでない方は
       <button
         onClick={() => navigate('/register')}
         className="text-blue-600 underline ml-1"
        >
         新規登録
       </button>
      </p>
    </div>
  );
}
