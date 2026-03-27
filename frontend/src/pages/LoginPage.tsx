import { useState } from 'react';
import { Box, Paper, TextField, Button, Typography, Stack } from '@mui/material';

export default function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const handleGiris = () => {
    if (user === 'admin' && pass === '123') {
      onLogin();
    } else {
      alert('Hatalı giriş! (Kullanıcı: admin, Şifre: 123)');
    }
  };

  return (
    <Box sx={{ 
      height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #802020 0%, #4a0a0a 100%)' 
    }}>
      <Paper sx={{ p: 5, borderRadius: '30px', width: '380px', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
        <Box sx={{ mb: 4 }}>
          <img src="https://www.aile.gov.tr/media/4336/logo-department.svg" width="70" alt="Logo" />
          <Typography variant="h5" fontWeight="900" sx={{ mt: 2, color: '#802020' }}>İK PORTAL</Typography>
        </Box>
        <Stack spacing={3}>
          <TextField label="Kullanıcı Adı" fullWidth value={user} onChange={(e) => setUser(e.target.value)} />
          <TextField label="Şifre" type="password" fullWidth value={pass} onChange={(e) => setPass(e.target.value)} />
          <Button variant="contained" fullWidth onClick={handleGiris} sx={{ bgcolor: '#802020', borderRadius: '12px', py: 1.5, fontWeight: 'bold' }}>
            SİSTEME GİRİŞ YAP
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}