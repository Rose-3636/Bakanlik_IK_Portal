import { useEffect, useState } from 'react';
import { Box, Card, Typography, Stack, Avatar, Button, Divider, IconButton } from '@mui/material';
import axios from 'axios';

// İKONLAR
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import SchoolIcon from '@mui/icons-material/School';
import FolderIcon from '@mui/icons-material/Folder';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CampaignIcon from '@mui/icons-material/Campaign';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import RefreshIcon from '@mui/icons-material/Refresh';

import CakeIcon from '@mui/icons-material/Cake';
import DescriptionIcon from '@mui/icons-material/Description';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';

export default function Dashboard() {
  const [personelSayisi, setPersonelSayisi] = useState(0);
  const [pozisyonSayisi, setPozisyonSayisi] = useState(0);
  const [egitimSayisi, setEgitimSayisi] = useState(0);

  // Takvim bilgileri
  const bugün = new Date();
  const gun = bugün.getDate();

  useEffect(() => {
    const port = "7261"; // Kendi port numaranızı kontrol edin
    const baseUrl = `https://localhost:${port}/api/Personel`;
    
    axios.get(baseUrl).then(res => setPersonelSayisi(res.data.length)).catch(() => setPersonelSayisi(16));
    axios.get(`${baseUrl}/PozisyonSayisi`).then(res => setPozisyonSayisi(res.data)).catch(() => setPozisyonSayisi(3));
    axios.get(`${baseUrl}/EgitimSayisi`).then(res => setEgitimSayisi(res.data)).catch(() => setEgitimSayisi(8));
  }, []);

  return (
    <Box sx={{ width: '100%', pb: 5 }}>
      
      {/* 1. SATIR: PERSONEL ÖZETİ VE DETAYLI HAVA DURUMU */}
      <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
        
        {/* TOPLAM PERSONEL KARTI */}
        <Card sx={{ 
          flex: 2, minWidth: '400px', borderRadius: '32px', p: 4, border: 'none', position: 'relative', overflow: 'hidden',
          boxShadow: '0 20px 50px rgba(0,0,0,0.05)', bgcolor: 'white'
        }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ position: 'relative', zIndex: 2 }}>
            <Box>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                <WavingHandIcon sx={{ color: '#ffb300', fontSize: 20 }} />
                <Typography variant="caption" fontWeight="1000" sx={{ color: '#802020', letterSpacing: 0.5 }}>HOŞ GELDİNİZ, GÜL HANIM</Typography>
              </Stack>
              <Typography variant="subtitle2" fontWeight="700" color="#64748b" sx={{ mt: 2 }}>Toplam Personel</Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h1" fontWeight="900" sx={{ color: '#1e293b', fontSize: '5.5rem' }}>{personelSayisi}</Typography>
                <Box sx={{ bgcolor: '#ecfdf5', color: '#10b981', px: 1.5, py: 0.5, borderRadius: '10px', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <TrendingUpIcon sx={{ fontSize: 16 }} />
                  <Typography variant="caption" fontWeight="900">%2.4</Typography>
                </Box>
              </Stack>
            </Box>

            <Box sx={{ textAlign: 'right' }}>
                <Typography variant="caption" fontWeight="800" color="#94a3b8" sx={{ letterSpacing: 1, display: 'block', mb: 1.5 }}>YENİ KATILANLAR</Typography>
                <Stack direction="row" spacing={-1.2} sx={{ justifyContent: 'flex-end', mb: 1 }}>
                   <Avatar src="https://i.pravatar.cc/150?u=1" sx={{ width: 38, height: 38, border: '3px solid white' }} />
                   <Avatar src="https://i.pravatar.cc/150?u=2" sx={{ width: 38, height: 38, border: '3px solid white' }} />
                   <Avatar src="https://i.pravatar.cc/150?u=3" sx={{ width: 38, height: 38, border: '3px solid white' }} />
                   <Box sx={{ width: 38, height: 38, borderRadius: '50%', bgcolor: '#f1f5f9', border: '3px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography sx={{ fontSize: 11, fontWeight: 'bold', color: '#64748b' }}>+5</Typography>
                   </Box>
                </Stack>
                <Typography variant="caption" fontWeight="800" color="#10b981">Bugün 2 yeni kayıt!</Typography>
            </Box>
          </Stack>
          <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '100px', opacity: 0.5 }}>
            <svg width="100%" height="100%" viewBox="0 0 1000 100" preserveAspectRatio="none">
              <path d="M0,80 C150,30 350,110 500,60 C650,10 850,90 1000,40 L1000,100 L0,100 Z" fill="rgba(76, 175, 80, 0.05)" />
              <path d="M0,80 C150,30 350,110 500,60 C650,10 850,90 1000,40" fill="none" stroke="#4caf50" strokeWidth="2.5" opacity="0.3" />
            </svg>
          </Box>
        </Card>

        {/* HAVA DURUMU KARTI */}
        <Card sx={{ 
          flex: 1.2, borderRadius: '32px', height: 280, color: 'white', border: 'none',
          background: 'linear-gradient(135deg, #1e3a5f 0%, #102a43 100%)', 
          boxShadow: '0 20px 40px rgba(16, 42, 67, 0.3)', display: 'flex', flexDirection: 'column'
        }}>
          <Box sx={{ p: 3, pb: 1 }}>
            <Stack direction="row" justifyContent="space-between">
              <Box>
                <Typography sx={{ fontSize: '1.2rem', fontWeight: 700 }}>Ankara</Typography>
                <Typography variant="caption" sx={{ opacity: 0.7 }}>26 Mart 2026, Perşembe</Typography>
              </Box>
              <Typography variant="h2" fontWeight="300">12°</Typography>
            </Stack>
            <Stack direction="row" spacing={3} sx={{ mt: 1 }}>
              <Box sx={{ textAlign: 'center' }}>
                <WbSunnyIcon sx={{ fontSize: 50, color: '#ffcc00' }} />
                <Typography variant="caption" sx={{ display: 'block', fontWeight: 'bold', fontSize: 10 }}>Parçalı bulutlu</Typography>
              </Box>
              <Stack spacing={0.5}>
                <Stack direction="row" spacing={1}><ThermostatIcon sx={{fontSize:14}}/><Typography sx={{fontSize:11}}>6°C / 14°C</Typography></Stack>
                <Stack direction="row" spacing={1}><AirIcon sx={{fontSize:14}}/><Typography sx={{fontSize:11}}>GB 4 km/sa</Typography></Stack>
                <Stack direction="row" spacing={1}><WaterDropIcon sx={{fontSize:14}}/><Typography sx={{fontSize:11}}>%42 Nem</Typography></Stack>
              </Stack>
            </Stack>
          </Box>
          <Box sx={{ mt: 'auto', bgcolor: 'rgba(0,0,0,0.2)', p: 1.5 }}>
            <Stack direction="row" justifyContent="space-around">
               {['Cmt','Paz','Pzt','Sal','Çar'].map((d) => <Typography key={d} sx={{fontSize:10, fontWeight:'bold'}}>{d}</Typography>)}
            </Stack>
          </Box>
        </Card>
      </Box>

      {/* 2. SATIR: İSTATİSTİKLER VE TAKVİM */}
      <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
        
        <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
           <Box sx={{ display: 'flex', gap: 3 }}>
              <Card sx={{ flex: 1, borderRadius: '24px', p: 2.5, boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                <Stack direction="row" spacing={1} alignItems="center" color="#1976d2" sx={{ mb: 1 }}><FolderIcon sx={{fontSize:18}}/><Typography variant="caption" fontWeight="900">AÇIK POZİSYONLAR</Typography></Stack>
                <Typography variant="h4" fontWeight="900">{pozisyonSayisi}</Typography>
                <Typography variant="caption" color="text.secondary">₺3.4M ↗ %2.4 Arttı</Typography>
              </Card>
              <Card sx={{ flex: 1, borderRadius: '24px', p: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box><Stack direction="row" spacing={1} alignItems="center" color="#ed6c02" sx={{ mb: 1 }}><SchoolIcon sx={{fontSize:18}}/><Typography variant="caption" fontWeight="900">EĞİTİMLER</Typography></Stack><Typography variant="h4" fontWeight="900">{egitimSayisi}</Typography></Box>
                <Box sx={{ width: 55, height: 55, borderRadius: '50%', background: 'conic-gradient(#4caf50 0% 40%, #ff9800 40% 70%, #2196f3 70% 100%)', p: 1 }}><Box sx={{ width: '100%', height: '100%', borderRadius: '50%', bgcolor: 'white' }} /></Box>
              </Card>
              <Card sx={{ flex: 1, borderRadius: '24px', p: 2.5, boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                <Stack direction="row" spacing={1} alignItems="center" color="#ff9800" sx={{ mb: 1 }}><CheckCircleIcon sx={{fontSize:18}}/><Typography variant="caption" fontWeight="900">ONAY BEKLEYEN</Typography></Stack>
                <Typography variant="h4" fontWeight="900">12</Typography>
                <Typography variant="caption" color="text.secondary">Talepler Bekliyor</Typography>
              </Card>
           </Box>

           <Box sx={{ display: 'flex', gap: 3 }}>
              <Card sx={{ flex: 1.5, borderRadius: '24px', p: 3, boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                <Stack direction="row" spacing={1} alignItems="center" color="#d32f2f" sx={{ mb: 2 }}><CampaignIcon/><Typography variant="subtitle2" fontWeight="900">Son Duyurular</Typography></Stack>
                <Stack spacing={1.5}>
                  <Box sx={{ p: 2, bgcolor: '#fdf2f2', borderRadius: '15px' }}><Typography variant="body2" fontWeight="900">Yeni Yan Haklar Politikası</Typography></Box>
                  <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: '15px' }}><Typography variant="body2" fontWeight="900">Eğitim Takvimi Yayında</Typography></Box>
                </Stack>
              </Card>
              <Card sx={{ flex: 1, borderRadius: '24px', p: 3, boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                <Stack direction="row" spacing={1} alignItems="center" color="#d32f2f" sx={{ mb: 1.5 }}><CakeIcon/><Typography variant="caption" fontWeight="900">Doğum Günleri</Typography></Stack>
                <Stack direction="row" spacing={-1.5} sx={{ mb: 2 }}>{[1,2,3].map(i => <Avatar key={i} src={`https://i.pravatar.cc/150?u=${i}`} sx={{ width: 32, height: 32, border: '2px solid white' }} />)}</Stack>
                <Typography variant="caption" fontWeight="bold">Bugün 4 kutlama var!</Typography>
              </Card>
           </Box>
        </Box>

        {/* Takvim Kartı */}
        <Card sx={{ flex: 1, borderRadius: '32px', p: 3, boxShadow: '0 15px 45px rgba(0,0,0,0.04)', bgcolor: 'white' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
             <Typography variant="subtitle2" fontWeight="900" color="#1e293b">📅 Takvim</Typography>
             <IconButton size="small"><RefreshIcon fontSize="small"/></IconButton>
          </Stack>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1, textAlign: 'center', mb: 2 }}>
            {['M','M','T','W','T','F','S'].map(d => <Typography key={d} variant="caption" fontWeight="900" color="#94a3b8" sx={{fontSize:10}}>{d}</Typography>)}
            {[...Array(28)].map((_, i) => (
              <Typography key={i} variant="caption" fontWeight="bold" sx={{ p: 0.5, fontSize:10, borderRadius: '50%', color: i+1 === gun ? 'white' : '#475569', bgcolor: i+1 === gun ? '#2196f3' : 'transparent' }}>{i+1}</Typography>
            ))}
          </Box>
          <Divider sx={{ my: 2 }} />
          <Typography sx={{fontSize:11, fontWeight:900, mb:1}}>ETKİNLİKLER</Typography>
          <Stack spacing={1}>
             <Typography variant="caption" fontWeight="bold">● Satış Teknikleri Eğitimi</Typography>
             <Typography variant="caption" fontWeight="bold">● Excel İleri Seviye</Typography>
          </Stack>
        </Card>
      </Box>

      {/* 3. SATIR: HIZLI ERİŞİM */}
      <Card sx={{ borderRadius: '32px', p: 3, border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.02)', bgcolor: 'rgba(255,255,255,0.5)' }}>
        <Typography variant="subtitle2" fontWeight="900" sx={{ mb: 2.5, color: '#1e293b' }}>Hızlı Erişim</Typography>
        <Box sx={{ display: 'flex', gap: 2.5, flexWrap: 'wrap' }}>
          {[
            { l: 'İzin Talebi Yap', i: <DescriptionIcon sx={{color:'#802020'}}/> },
            { l: 'Eğitimlerim', i: <SchoolIcon sx={{color:'#ff9800'}}/> },
            { l: 'Formlar ve Belgeler', i: <FolderIcon sx={{color:'#1976d2'}}/> },
            { l: 'Yıllık Değerlendirme', i: <EventAvailableIcon sx={{color:'#d32f2f'}}/> }
          ].map(btn => (
            <Button key={btn.l} variant="contained" startIcon={btn.i} sx={{ 
              flex: 1, minWidth: '180px', bgcolor: 'white', color: '#1e293b', fontWeight: '900', textTransform: 'none', 
              borderRadius: '16px', py: 1.5, boxShadow: '0 8px 20px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9',
              '&:hover': { bgcolor: '#f8fafc', transform: 'translateY(-3px)' }, transition: '0.3s'
            }}>{btn.l}</Button>
          ))}
        </Box>
      </Card>

    </Box>
  );
}