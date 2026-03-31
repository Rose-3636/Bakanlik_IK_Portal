import { useState } from 'react';
import { Box } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import PersonelListe from './pages/PersonelListe';
import Puantaj from './pages/Puantaj';
import Bordro from './pages/Bordro'; 
import IzinYonetimi from './pages/IzinYonetimi';
import DuyuruYonetimi from './pages/DuyuruYonetimi';
import LoginPage from './pages/LoginPage';

// 1. ADIM: Hafıza merkezini (useAuth) buraya çağırdık
import { useAuth } from './context/AuthContext'; 

function App() {
  // 2. ADIM: Artık girişi 'true/false' diye elle yazmıyoruz. 
  // Direkt hafızadaki 'user' var mı yok mu ona bakıyoruz.
  const { user, login } = useAuth(); 

  // Eğer hafızada kullanıcı yoksa (logout yapıldıysa) giriş sayfasına atar
  if (!user) {
    return <LoginPage onLogin={login} />;
  }

  // Kullanıcı varsa (giriş yapıldıysa) portalı gösterir
  return (
    <BrowserRouter>
      <Box sx={{ display: 'flex', bgcolor: '#f4f7f9', minHeight: '100vh' }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, ml: '280px', p: 5 }}>
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/personel" element={<PersonelListe />} />
            <Route path="/puantaj" element={<Puantaj />} />
            <Route path="/bordro" element={<Bordro />} />
            <Route path="/izin" element={<IzinYonetimi />} />
            <Route path="/duyurular" element={<DuyuruYonetimi />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}

export default App;