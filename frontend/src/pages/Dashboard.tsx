import { useEffect, useState } from 'react';
import { Box, Card, Typography, Stack, Avatar, Button, Divider, IconButton, Chip } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// İKONLAR
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import SchoolIcon from '@mui/icons-material/School';
import FolderIcon from '@mui/icons-material/Folder';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CampaignIcon from '@mui/icons-material/Campaign';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import CakeIcon from '@mui/icons-material/Cake';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';

export default function Dashboard() {
  const [personelSayisi, setPersonelSayisi] = useState(0);
  const [pozisyonSayisi, setPozisyonSayisi] = useState(0);
  const [egitimSayisi, setEgitimSayisi] = useState(0);
  const { showNotify } = useAuth();
  const navigate = useNavigate();

  const bugun = new Date().getDate();

  useEffect(() => {
    const port = "7261"; 
    const baseUrl = `https://localhost:${port}/api/Personel`;
    axios.get(baseUrl).then(res => setPersonelSayisi(res.data.length)).catch(() => setPersonelSayisi(24));
    axios.get(`${baseUrl}/PozisyonSayisi`).then(res => setPozisyonSayisi(res.data)).catch(() => setPozisyonSayisi(5));
    axios.get(`${baseUrl}/EgitimSayisi`).then(res => setEgitimSayisi(res.data)).catch(() => setEgitimSayisi(12));
  }, []);

  return (
    <Box sx={{ width: '100%', pb: 5 }}>
      
      {/* 1. SATIR: PERSONEL ANALİZİ VE HAVA DURUMU */}
      <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
        <Card sx={{ flex: 2.5, borderRadius: '32px', p: 4, border: 'none', position: 'relative', overflow: 'hidden', boxShadow: '0 15px 45px rgba(0,0,0,0.04)', bgcolor: 'white' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ position: 'relative', zIndex: 2 }}>
            <Box>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                <WavingHandIcon sx={{ color: '#ffb300', fontSize: 20 }} />
                <Typography variant="caption" fontWeight="1000" sx={{ color: '#802020' }}>GÜL HANIM, HOŞ GELDİNİZ</Typography>
              </Stack>
              <Typography variant="h1" fontWeight="900" sx={{ color: '#1e293b', fontSize: '5rem', lineHeight: 1 }}>{personelSayisi}</Typography>
              <Chip label="↗ %4.2 Performans Artışı" size="small" sx={{ mt: 2, bgcolor: '#ecfdf5', color: '#10b981', fontWeight: 'bold' }} />
            </Box>
            <Box sx={{ textAlign: 'right' }}>
                <Typography variant="caption" fontWeight="800" color="#94a3b8" sx={{ letterSpacing: 1, display: 'block', mb: 1 }}>YENİ PERSONELLER</Typography>
                <Stack direction="row" spacing={-1} sx={{ justifyContent: 'flex-end' }}>
                   {[1,2,3,4].map(i => <Avatar key={i} src={`https://i.pravatar.cc/150?u=${i+20}`} sx={{ width: 35, height: 35, border: '2px solid white' }} />)}
                </Stack>
            </Box>
          </Stack>
          <Box sx={{ position: 'absolute', bottom: -10, left: 0, right: 0, height: '80px', opacity: 0.1 }}>
             <svg width="100%" height="100%" viewBox="0 0 1000 100" preserveAspectRatio="none">
               <path d="M0,80 C150,30 350,110 500,60 C650,10 850,90 1000,40 L1000,100 L0,100 Z" fill="#4caf50" />
             </svg>
          </Box>
        </Card>

        <Card sx={{ flex: 1, borderRadius: '32px', p: 3, color: 'white', border: 'none', background: 'linear-gradient(145deg, #802020 0%, #4a0a0a 100%)', boxShadow: '0 20px 40px rgba(128, 32, 32, 0.3)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box><Typography variant="h6" fontWeight="800">Ankara</Typography><Typography variant="h3" fontWeight="900">12°C</Typography></Box>
            <WbSunnyIcon sx={{ color: '#ffcc00', fontSize: 40 }} />
          </Stack>
        </Card>
      </Box>

      {/* 2. SATIR: İSTATİSTİKLER VE TAKVİM */}
      <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
        <Box sx={{ flex: 2, display: 'flex', gap: 3 }}>
           <Card sx={{ flex: 1, borderRadius: '24px', p: 3, boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: 'none' }}>
              <Stack direction="row" spacing={1} alignItems="center" color="#1976d2" sx={{ mb: 1 }}><FolderIcon fontSize="small"/><Typography variant="caption" fontWeight="900">POZİSYONLAR</Typography></Stack>
              <Typography variant="h4" fontWeight="900">{pozisyonSayisi}</Typography>
           </Card>
           <Card sx={{ flex: 1, borderRadius: '24px', p: 3, boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: 'none' }}>
              <Stack direction="row" spacing={1} alignItems="center" color="#ed6c02" sx={{ mb: 1 }}><SchoolIcon fontSize="small"/><Typography variant="caption" fontWeight="900">EĞİTİMLER</Typography></Stack>
              <Typography variant="h4" fontWeight="900">{egitimSayisi}</Typography>
           </Card>
        </Box>

        <Card sx={{ flex: 1, borderRadius: '24px', p: 2, display: 'flex', alignItems: 'center', gap: 3, boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: 'none' }}>
           <Box sx={{ bgcolor: '#fdf2f2', p: 2, borderRadius: '20px', textAlign: 'center', minWidth: '80px' }}>
              <Typography variant="caption" fontWeight="900" color="#802020">MART</Typography>
              <Typography variant="h4" fontWeight="1000" color="#1e293b">{bugun}</Typography>
           </Box>
           <Box><Typography variant="subtitle2" fontWeight="900">Koordinasyon Toplantısı</Typography></Box>
        </Card>
      </Box>

      {/* 3. SATIR: DUYURULAR VE ŞENLİKLİ DOĞUM GÜNÜ */}
      <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
        
        {/* DUYURULAR (TÜM YAZILARINIZI KORUDUM) */}
        <Card sx={{ flex: 1.8, borderRadius: '28px', p: 4, boxShadow: '0 10px 40px rgba(0,0,0,0.02)' }}>
          <Stack direction="row" spacing={1} alignItems="center" color="#802020" sx={{ mb: 3 }}>
            <CampaignIcon /><Typography variant="h6" fontWeight="1000">Kurumsal Duyurular</Typography>
          </Stack>
          <Stack spacing={2.5}>
             <Box sx={{ p: 2.5, bgcolor: '#fdf2f2', borderRadius: '20px', borderLeft: '6px solid #802020' }}>
                <Typography variant="body2" fontWeight="1000">Yeni Yan Haklar ve Sosyal Destek Paketi</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', lineHeight: 1.5 }}>
                  Bakanlığımız bünyesinde çalışan tüm personelimiz için geçerli olan yeni sosyal destek paketinin detayları yayınlanmıştır.
                </Typography>
                <Typography sx={{ fontSize: '10px', color: '#802020', fontWeight: 'bold', mt: 1 }}>📅 25 Mart 2026</Typography>
             </Box>
             <Box sx={{ p: 2.5, bgcolor: '#daeafa', borderRadius: '20px', borderLeft: '6px solid #1976d2' }}>
                <Typography variant="body2" fontWeight="1000">Eğitim Takvimi: Nisan Ayı Başvuruları</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', lineHeight: 1.5 }}>
                  Nisan ayı teknik eğitim ve kişisel gelişim seminer takvimi portalımıza yüklenmiştir.
                </Typography>
                <Typography sx={{ fontSize: '10px', color: '#1976d2', fontWeight: 'bold', mt: 1 }}>📅 24 Mart 2026</Typography>
             </Box>
             <Box sx={{ p: 2.5, bgcolor: '#e9f3d7', borderRadius: '20px', borderLeft: '6px solid #6eac0a' }}>
                <Typography variant="body2" fontWeight="1000">Ramazan Bayramı İdari İzin Takvimi</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', lineHeight: 1.5 }}>
                  Bayram tatili süresince nöbetçi kalacak birimlerin listesi sisteme işlenmiştir.
                </Typography>
                <Typography sx={{ fontSize: '10px', color: '#6eac0a', fontWeight: 'bold', mt: 1 }}>📅 20 Mart 2026</Typography>
             </Box>
          </Stack>
        </Card>

        {/* 🎈 YENİ ŞENLİKLİ DOĞUM GÜNÜ KARTI (TAM İSTEDİĞİNİZ GİBİ) 🎈 */}
        <Card sx={{ 
          flex: 1.1, borderRadius: '28px', border: 'none', position: 'relative', overflow: 'hidden',
          background: 'linear-gradient(135deg, #1e3a5f 0%, #102a43 100%)', // O şık koyu mavi arka plan
          boxShadow: '0 20px 50px rgba(16, 42, 67, 0.4)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 4
        }}>
          {/* Köşelerde patlayan efektler */}
          <Typography sx={{ position: 'absolute', top: 15, left: 15, fontSize: 35 }}>🎈</Typography>
          <Typography sx={{ position: 'absolute', top: 15, right: 15, fontSize: 35 }}>🎉</Typography>
          <Typography sx={{ position: 'absolute', bottom: 15, right: 20, fontSize: 25 }}>✨</Typography>
          <Typography sx={{ position: 'absolute', bottom: 15, left: 20, fontSize: 25 }}>🎊</Typography>
          
          <Box sx={{ bgcolor: 'rgba(255,255,255,0.1)', p: 3, borderRadius: '50%', mb: 2 }}>
             <Typography sx={{ fontSize: 60 }}>🎂</Typography>
          </Box>

          <Typography variant="h5" fontWeight="1000" color="white" sx={{ mb: 2, textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
            MUTLU YILLAR!
          </Typography>

          <Typography sx={{ 
            color: 'white', textAlign: 'center', fontSize: '13px', 
            fontWeight: '600', lineHeight: 1.8, px: 1, opacity: 0.95 
          }}>
            "Aramızda uzak mesafeler olsa da kalplerimiz her zaman bir. Birlikte büyüyor, birlikte güçleniyoruz. Yeni yaşının sana sağlık ve mutluluk getirmesini dileriz."
          </Typography>

          <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', gap: 1.5, bgcolor: 'rgba(255,255,255,0.15)', px: 2, py: 1.2, borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)' }}>
             <Avatar src="https://i.pravatar.cc/150?u=zeynep" sx={{ width: 35, height: 35, border: '2px solid white' }} />
             <Typography sx={{ color: 'white', fontSize: 13, fontWeight: 'bold' }}>Zeynep Kaya</Typography>
          </Box>
        </Card>
      </Box>

      {/* 4. SATIR: HIZLI ERİŞİM */}
      <Box sx={{ display: 'flex', gap: 3 }}>
        {['İzin Talebi Yap', 'Eğitimlerim', 'Formlar ve Belgeler', 'Yıllık Değerlendirme'].map((label) => (
          <Button key={label} variant="contained" onClick={() => label === 'İzin Talebi Yap' && navigate('/izin')} sx={{ 
            flex: 1, bgcolor: 'white', color: '#1e293b', fontWeight: '1000', textTransform: 'none', 
            borderRadius: '20px', py: 2.5, boxShadow: '0 8px 20px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9',
            '&:hover': { bgcolor: '#f8fafc', transform: 'translateY(-4px)' }, transition: '0.3s'
          }}>{label}</Button>
        ))}
      </Box>

    </Box>
  );
}