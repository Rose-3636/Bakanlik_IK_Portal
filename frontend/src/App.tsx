import { useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
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
import { useAuth } from './context/AuthContext'; 

function App() {
  const { user, login } = useAuth(); 
  const theme = useTheme();
  
  // SİHİRLİ SATIR: Eğer ekran 900px'den küçükse (telefonsa) 'isMobile' true olur
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (!user) {
    return <LoginPage onLogin={login} />;
  }

  return (
    <BrowserRouter>
      <Box sx={{ 
        display: 'flex', 
        bgcolor: '#f4f7f9', 
        minHeight: '100vh',
        flexDirection: isMobile ? 'column' : 'row' // Telefondaysa alt alta diz
      }}>
        
        {/* Mobilde yan menüyü gizliyoruz, bilgisayarda gösteriyoruz */}
        {!isMobile && <Sidebar />}
        
        <Box sx={{ 
          flexGrow: 1, 
          ml: isMobile ? 0 : '280px', // Telefondaysa soldan boşluk bırakma!
          p: isMobile ? 2 : 5, // Telefondaysa daha az boşluk bırak
          width: isMobile ? '100%' : 'calc(100% - 280px)' 
        }}>
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