import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleRegister} from '../api/auth'
import API from '../api/api';

export default function RegisterPage({ setUser }) {
    const navigate = useNavigate()
    const [name, setName]     = useState('')
    const [email, setEmail]   = useState('')
    const [password, setPasword] =useState('')
    const [passwordConfirmation, setPasswordConfirmation] =useState('')
    const [error, setError]   = useState(null)
    const [loading, setLoading] =useState(false)

    const handleSubmit = async e => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        try{
           const { data } = await API.post('/register', {
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
          });

          //もし登録後に自動ログインさせるならtoken 発行エンドポイントを呼ぶか、
          //setUserやnavigateする処理を書く
            navigate('/login')
        } catch (e) {
            setError('登録に失敗しました')
        }finally {
            setLoading(false)
        }
        };


        return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">新規登録</h1>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>名前</label>
          <input type="name" value={name} onChange={e => setName(e.target.value)}
                 required className="w-full border px-2 py-1 rounded" />
        </div>
        <div>
          <label>メールアドレス</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                 required className="w-full border px-2 py-1 rounded" />
        </div>
        <div>
          <label>パスワード</label>
          <input type="password" value={password} onChange={e => setPasword(e.target.value)}
                 required className="w-full border px-2 py-1 rounded" />
        </div>
        <div>
          <label>パスワード確認</label>
          <input type="passwordConfirmation" value={passwordConfirmatin} onChange={e => setPasswordConfirmation(e.target.value)}
                 required className="w-full border px-2 py-1 rounded" />
        </div>
        <button type="submit" disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          {loading ? '登録中…' : '登録'}
        </button>
      </form>
    </div>
  )
}