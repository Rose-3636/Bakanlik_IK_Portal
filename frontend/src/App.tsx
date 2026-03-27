import { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import PersonelListe from './pages/PersonelListe';
import Puantaj from './pages/Puantaj';
import Bordro from './pages/Bordro'; 
import IzinYonetimi from './pages/IzinYonetimi'; // 1. İzin sayfasını buraya ekledik
import LoginPage from './pages/LoginPage';

function App() {
  // Geliştirme kolaylığı için giriş yapılmış kabul ediyoruz
  const [isLoggedIn, setIsLoggedIn] = useState(true); 
  const [aktifSayfa, setAktifSayfa] = useState('dashboard');

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <Box sx={{ display: 'flex', bgcolor: '#f4f7f9', minHeight: '100vh' }}>
      
      {/* Yan Menü: Tıklanan butona göre aktifSayfa değişir */}
      <Sidebar sayfaDegistir={(sayfa: string) => setAktifSayfa(sayfa)} />
      
      <Box sx={{ flexGrow: 1, ml: '280px', p: 5 }}>
        <Header />
        
        {/* 2. SAYFA KUMANDASI - TÜM SAYFALAR BURADA SIRALI */}
        {aktifSayfa === 'dashboard' ? (
          <Dashboard />
        ) : aktifSayfa === 'personel' ? (
          <PersonelListe />
        ) : aktifSayfa === 'puantaj' ? (
          <Puantaj />
        ) : aktifSayfa === 'bordro' ? (
          <Bordro />
        ) : (
          <IzinYonetimi /> // Diğer tüm durumlarda İzin sayfasını göster
        )}
      </Box>
    </Box>
  );
}

export default App;