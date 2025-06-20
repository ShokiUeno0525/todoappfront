import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { fetchCurrentUser } from './api/auth';
import LoginPage from './pages/loginPage';
import RegisterPage from  './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import { ChakraBaseProvider } from '@chakra-ui/react'
import './App.css'
import { Title } from './Title'


function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] =useState(true);

  //起動時にログイン済か確認
  useEffect(() => {
    (async () =>{
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
    return
    <ChakraBaseProvider>

     <div>Loading...</div>;
     
    </ChakraBaseProvider>
  }

  return (
    <BrowserRouter>
     <Routes>
      <Route
       path="/login"
       element={!user ? <LoginPage setUser={setUser} /> : <Navigate to="/dashboard" replace />}
       />
      <Route
        path="/register"
        element={!user ? <RegisterPage setUser={setUser} /> : <Navigate to="/dashboard" replace />}
        />
      <Route
       path="/register"
       element={user ? <DashboardPage user={user} /> : <Navigate to="/login" replace />}
       />
       //その他のルート追加してもいいよ
    　</Routes>
    </BrowserRouter>
  );
}

export default App;
