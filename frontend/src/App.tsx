import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from './store/index';
import { logout } from './store/authSlice';

// Sayfalar - BURASI ÇOK ÖNEMLİ, TÜM SAYFALARI ÇAĞIRIYORUZ
import LoginPage from './pages/LoginPage';
import FinansDashboard from './pages/FinansDashboard'; 
import SistemDurum from './pages/SistemDurum';
import OrgManagement from './pages/OrgManagement';
import PayrollPage from './pages/PayrollPage'; 
import PersonnelPage from './pages/PersonnelPage'; // Az önce yarım kalan importu tamamladık
import TimeManagement from './pages/TimeManagement';


// Bileşenler ve Tasarım
import MainLayout from './components/MainLayout';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import { Typography } from '@mui/material';

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);
  
  // Hangi sayfanın açık olduğunu tutan state
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogout = () => {
    dispatch(logout());
    setActiveTab('dashboard');
  };

  // 1. GİRİŞ YAPILMADIYSA: Login Sayfasını Göster
  if (!isLoggedIn) {
    return (
      <ThemeProvider theme={theme}>
        <LoginPage />
      </ThemeProvider>
    );
  }

  // 2. GİRİŞ YAPILDIYSA: MainLayout içinde seçili tabı göster
  return (
    <ThemeProvider theme={theme}>
      <MainLayout 
        activeTab={activeTab} 
        setTab={setActiveTab} 
        user={user} 
        onLogout={handleLogout}
      >
        {/* MODÜL GEÇİŞ MANTIĞI */}
        {activeTab === 'dashboard' && <FinansDashboard />}
        {activeTab === 'sistem' && <SistemDurum />}
        {activeTab === 'org' && <OrgManagement />}
        {activeTab === 'payroll' && <PayrollPage />}
        {activeTab === 'personnel' && <PersonnelPage />}
        {activeTab === 'payroll' && <PayrollPage />}
        {activeTab === 'time' && <TimeManagement />}
        {/* Henüz kodlamadığımız sayfalar için geçici yazı */}
        {activeTab === 'time' && (
          <Typography variant="h4" fontWeight="1000" sx={{color:'#1e293b'}}>
            Zaman Yönetimi (Puantaj) Modülü Hazırlanıyor...
          </Typography>
        )}
        
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;