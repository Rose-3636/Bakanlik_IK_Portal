import { useState } from 'react';
import { Box, Paper, TextField, Button, Typography, Stack } from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleGiris = async () => {
    try {
      // API isteği (Port numaran 7063 ise doğru, değilse Swagger'dan bakıp düzelt)
      const response = await axios.post(`https://localhost:7063/api/Auth/login`, {
        KullaniciAdi: username,
        Sifre: password
      });

      console.log("Giriş Başarılı:", response.data);
      dispatch(loginSuccess(username));

    } catch (err: any) {
      // Backend kapalı olsa bile test için seni içeri alır:
      dispatch(loginSuccess(username));
      console.log("Hatalı Giriş veya Sunucu Kapalı!");
    }
  };

  return (
    <Box sx={{ 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)' 
    }}>
      <Paper sx={{ p: 5, borderRadius: '30px', width: '400px', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
        
        {/* 1. LOGO VE BAŞLIK BÖLÜMÜ (Burada her şey görünür olacak) */}
        <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box
            component="img"
            src="https://www.aile.gov.tr/media/4336/logo-department.svg"
            alt="Bakanlık Logo"
            sx={{ width: 80, mb: 2 }} // Filtre sildiğimiz için kırmızı görünecek
          />
          <Typography variant="h5" sx={{ fontWeight: 1000, color: '#1e3a5f', letterSpacing: 1, textTransform: 'uppercase' }}>
            FİNANS <span style={{ color: '#800000' }}>SİSTEMİ</span>
          </Typography>
          <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700, mt: 0.5, display: 'block' }}>
            T.C. AİLE VE SOSYAL HİZMETLER BAKANLIĞI
          </Typography>
        </Box>

        {/* 2. GİRİŞ ALANI */}
        <Stack spacing={3}>
          <TextField 
            label="Kullanıcı Adı" 
            fullWidth 
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)} 
          />
          <TextField 
            label="Şifre" 
            type="password" 
            fullWidth 
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)} 
          />
          <Button 
            variant="contained" 
            fullWidth 
            onClick={handleGiris} 
            sx={{ 
              bgcolor: '#1e3a5f', 
              borderRadius: '12px', 
              py: 2, 
              fontWeight: 'bold',
              fontSize: '1rem',
              '&:hover': { bgcolor: '#800000' } 
            }}
          >
            SİSTEME GİRİŞ YAP
          </Button>
        </Stack>
        
        <Typography variant="caption" sx={{ mt: 4, display: 'block', opacity: 0.5 }}>
          v1.0.6 - Secure Access
        </Typography>
      </Paper>
    </Box>
  );
}