// 'type' kelimesini ekledik ve 'React' kelimesini sildik (Hata ve Uyarı böylece gitti)
import { createContext, useContext, useState, type ReactNode } from 'react';
import { Snackbar, Alert } from '@mui/material';

interface AuthContextType {
  user: { name: string; role: string } | null;
  login: (userData: any) => void;
  logout: () => void;
  showNotify: (message: string, severity?: 'success' | 'error' | 'warning' | 'info') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ name: string; role: string } | null>(() => {
    const saved = localStorage.getItem('aktifUser');
    return saved ? JSON.parse(saved) : null;
  });

  const [notify, setNotify] = useState({ open: false, message: '', severity: 'success' as any });

  const login = (userData: any) => {
    const newUser = { name: userData.kullaniciAdi, role: userData.rol };
    setUser(newUser);
    localStorage.setItem('aktifUser', JSON.stringify(newUser));
    showNotify(`Hoş geldiniz, yetkiniz: ${userData.rol}`, "success");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('aktifUser');
    window.location.href = "/";
  };

  const showNotify = (message: string, severity: any = 'success') => {
    setNotify({ open: true, message, severity });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, showNotify }}>
      {children}
      <Snackbar 
        open={notify.open} 
        autoHideDuration={3000} 
        onClose={() => setNotify({...notify, open: false})}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={notify.severity} sx={{ borderRadius: '15px', fontWeight: 'bold' }}>
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