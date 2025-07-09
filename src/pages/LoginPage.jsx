// src/pages/LoginPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api'; // baseURL と withCredentials を設定済みとする

export default function LoginPage({ setUser }) {
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
      const res = await API.post('/login', { email, password });
      const token = res.data.token;

      // 1) トークンを localStorage に保存
      localStorage.setItem('token', token);

      // 2) API の Authorization ヘッダをデフォルト設定
      API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(true)
      // 3) ログイン後はタスク一覧へリダイレクト
      navigate('/todos');
    } catch (e) {
      console.error(e);
      if (e.code === 'ERR_NETWORK' || e.message === 'Network Error') {
        setError('サーバーに接続できません。サーバーが起動していることを確認してください。');
      } else {
        setError(
          e.response?.status === 401
            ? 'メールアドレスかパスワードが正しくありません'
            : 'ログインに失敗しました'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">ログイン</h1>
          <p className="text-gray-600">アカウントにログインしてください</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              メールアドレス
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="example@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              パスワード
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="パスワードを入力してください"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'ログイン中…' : 'ログイン'}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate('/forgot-password')}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            パスワードを忘れた場合
          </button>
        </div>
        
        <div className="mt-2 text-center">
          <span className="text-gray-600 text-sm">アカウントをお持ちでない方は </span>
          <button
            onClick={() => navigate('/register')}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            新規登録
          </button>
        </div>
      </div>
    </div>
  );
}
