import { useEffect, useState } from 'react';
import { Box, Card, Typography, Stack, Avatar, Divider, Chip } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// İKONLAR
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WavingHandIcon from '@mui/icons-material/WavingHand';

export default function Dashboard() {
  const [personelSayisi, setPersonelSayisi] = useState(0);
  const { showNotify } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const port = "7261"; // Kendi port numaranızı kontrol edin!
    axios.get(`https://localhost:${port}/api/Personel`)
      .then(res => setPersonelSayisi(res.data.length))
      .catch(() => console.error("API Bağlantısı yok."));
  }, []);

  return (
    <Box sx={{ width: '100%', pb: 5 }}>
      <Card sx={{ 
        borderRadius: '32px', p: 4, border: 'none', position: 'relative', overflow: 'hidden',
        boxShadow: '0 20px 50px rgba(0,0,0,0.05)', bgcolor: 'white' 
      }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
          <WavingHandIcon sx={{ color: '#ffb300', fontSize: 20 }} />
          <Typography variant="caption" fontWeight="1000" sx={{ color: '#802020' }}>HOŞ GELDİNİZ, GÜL HANIM</Typography>
        </Stack>
        <Typography variant="h1" fontWeight="900" sx={{ color: '#1e293b', fontSize: '5rem' }}>
          {personelSayisi}
        </Typography>
        <Typography variant="subtitle2" fontWeight="700" color="#64748b">Toplam Personel Mevcudu</Typography>
      </Card>
      
      {/* Diğer tasarım parçalarını sistem düzelince tek tek geri koyarız, şimdilik bunu bir görelim */}
    </Box>
  );
}