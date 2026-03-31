import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Snackbar, Alert } from '@mui/material';

interface AuthContextType {
  user: { name: string; role: string } | null;
  login: (userData: any) => void;
  logout: () => void;
  showNotify: (message: string, severity?: 'success' | 'error' | 'warning' | 'info') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // 1. ADIM: Sayfa yenilendiğinde kullanıcıyı hatırlamak için tarayıcı günlüğüne (localStorage) bakıyoruz
  const [user, setUser] = useState<{ name: string; role: string } | null>(() => {
    const kaydedilmisUser = localStorage.getItem('aktifKullanici');
    return kaydedilmisUser ? JSON.parse(kaydedilmisUser) : null;
  });

  const [notify, setNotify] = useState({ open: false, message: '', severity: 'success' as any });

  // 2. ADIM: Giriş fonksiyonu (Backend'den gelen veriyi buraya alıyoruz)
  const login = (userData: any) => {
    // Backend'den gelen 'kullaniciAdi' ve 'rol' bilgilerini şık bir pakete koyuyoruz
    const yeniKullanici = { name: userData.kullaniciAdi, role: userData.rol };
    
    setUser(yeniKullanici); // React hafızasına al
    localStorage.setItem('aktifKullanici', JSON.stringify(yeniKullanici)); // Tarayıcı hafızasına al (Kalıcı olsun)
    
    showNotify(`Hoş geldiniz, yetkiniz: ${userData.rol}`, "success");
  };

  // 3. ADIM: Çıkış fonksiyonu
  const logout = () => {
    setUser(null);
    localStorage.removeItem('aktifKullanici'); // Tarayıcıdan da sil
  };

  const showNotify = (message: string, severity: any = 'success') => {
    setNotify({ open: true, message, severity });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, showNotify }}>
      {children}
      
      {/* ŞIK BİLDİRİM BALONU */}
      <Snackbar 
        open={notify.open} 
        autoHideDuration={3000} 
        onClose={() => setNotify({...notify, open: false})} 
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setNotify({...notify, open: false})} 
          severity={notify.severity} 
          sx={{ borderRadius: '15px', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
        >
          {notify.message}
        </Alert>
      </Snackbar>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth hatası!");
  return context;
};