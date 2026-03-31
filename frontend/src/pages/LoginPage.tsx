import { useState } from 'react';
import { Box, Paper, TextField, Button, Typography, Stack } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function LoginPage({ onLogin }: { onLogin: (data: any) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { showNotify } = useAuth();

  const handleGiris = async () => {
    try {
      // NOT: Port numaranız 7261 değilse burayı Swagger'daki ile güncelleyin
      const port = "7261"; 
      
      const response = await axios.post(`https://localhost:${port}/api/Auth/login`, {
        // Backend'deki 'Kullanici' modelindeki isimlerle BİREBİR AYNI olmalı:
        KullaniciAdi: username, 
        Sifre: password
      });

      // Giriş başarılıysa bilgileri hafıza merkezine (AuthContext) gönderiyoruz
      onLogin(response.data);
      
    } catch (err: any) {
      // Hata olursa sağ alttan balon çıksın
      showNotify("Giriş başarısız! Kullanıcı adı veya şifre hatalı.", "error");
    }
  };

  return (
    <Box sx={{ 
      height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #802020 0%, #4a0a0a 100%)' 
    }}>
      <Paper sx={{ p: 5, borderRadius: '30px', width: '380px', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
        <Box sx={{ mb: 4 }}>
          <img src="https://www.aile.gov.tr/media/4336/logo-department.svg" width="70" alt="Logo" style={{ filter: 'brightness(1)' }} />
          <Typography variant="h5" fontWeight="900" sx={{ mt: 2, color: '#802020' }}>İK PORTAL</Typography>
          <Typography variant="caption" color="text.secondary">T.C. Aile ve Sosyal Hizmetler Bakanlığı</Typography>
        </Box>
        <Stack spacing={3}>
          <TextField 
            label="Kullanıcı Adı" 
            fullWidth 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
          <TextField 
            label="Şifre" 
            type="password" 
            fullWidth 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <Button 
            variant="contained" 
            fullWidth 
            onClick={handleGiris} 
            sx={{ bgcolor: '#802020', borderRadius: '12px', py: 1.5, fontWeight: 'bold' }}
          >
            GİRİŞ YAP
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}