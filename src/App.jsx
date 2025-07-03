
import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { fetchCurrentUser } from './api/auth';
import LoginPage from './pages/LoginPage';
import TodoPage from './pages/TodoPage';
import RegisterPage from  './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import { ChakraBaseProvider } from '@chakra-ui/react'
import './App.css'


function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] =useState(true);

  //起動時にログイン済か確認
  useEffect(() => {
    (async () =>{
      //まずローカルストレージにトークンがあるかチェック
     const token = localStorage.getItem('token');
     if (!token) {
      //トークンなし→未ログイン
      setUser(null);
      setLoading(false);
      return;
     }
      //トークンがある場合だけ　/api/userを呼び出し
      try{
        const data = await fetchCurrentUser();
        setUser(data);
     } catch (e) {
      setUser(null);
     } finally {
      setLoading(false);
     }
    })();
  }, []);

  if (loading) {
    return (
    <ChakraBaseProvider>

     <div className="p-4 text-center">Loading...</div>
     
    </ChakraBaseProvider>
    );
  }

  return (
   <ChakraBaseProvider>
     <Routes>

      {/* ルートパスに来たらログインに飛ばす　*/}
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route
       path="/login"
       element={!user ? <LoginPage setUser={setUser} /> : <Navigate to="/dashboard" replace />}
       />
      <Route
       path="/register"
       element={!user ? <RegisterPage setUser={setUser} /> : <Navigate to="/dashboard" replace />}
       />

      {/* ログイン必須ルート　*/}
      <Route
       path="/dashboard"
       element={user ? <DashboardPage user={user} /> : <Navigate to="/login" replace />}
       />
       <Route
       path="/todos"
       element={user ? <TodoPage /> : <Navigate to="/login" replace />}
      />


      { /* その他未定義パスは状態に応じて振り分け */}
      <Route
       path="*"
       element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
      />
      </Routes>
  </ChakraBaseProvider>
  );
}

export default App;
