import { Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Avatar, Button } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FlightIcon from '@mui/icons-material/Flight';
import LogoutIcon from '@mui/icons-material/Logout';
import CampaignIcon from '@mui/icons-material/Campaign';
import myPhoto from '../assets/foti.png';
import { useNavigate, useLocation } from 'react-router-dom';

// 1. ADIM: Hafıza merkezini (useAuth) buraya çağırdık (Eksik olan buydu)
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 2. ADIM: Çıkış yapma yeteneğini hafızadan aldık
  const { logout } = useAuth();

  const menu = [
    { text: 'DASHBOARD', icon: <DashboardIcon />, path: '/' },
    { text: 'PERSONEL', icon: <PeopleIcon />, path: '/personel' },
    { text: 'PUANTAJ', icon: <DateRangeIcon />, path: '/puantaj' },
    { text: 'BORDRO', icon: <AssignmentIcon />, path: '/bordro' },
    { text: 'İZİN YÖNETİMİ', icon: <FlightIcon />, path: '/izin' },
    { text: 'DUYURU YÖNETİMİ', icon: <CampaignIcon />, path: '/duyurular' },
  ];

  return (
    <Box sx={{ width: 280, bgcolor: '#802020', color: 'white', height: '100vh', position: 'fixed', display: 'flex', flexDirection: 'column', left: 0, top: 0, zIndex: 1000 }}>
      
      {/* LOGO ALANI */}
      <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <Box
          component="img"
          src="https://www.aile.gov.tr/media/4336/logo-department.svg"
          alt="Logo"
          sx={{ width: 75, height: 75, filter: 'brightness(0) invert(1)', mb: 2 }}
        />
        <Typography variant="h5" fontWeight="900" sx={{ letterSpacing: 1.5 }}>İK PORTAL</Typography>
      </Box>

      {/* PROFİL BİLGİLERİ */}
      <Box sx={{ px: 3, mb: 4, textAlign: 'center' }}>
        <Avatar src={myPhoto} sx={{ width: 110, height: 110, mx: 'auto', mb: 2, border: '3px solid white' }} />
        <Typography sx={{ fontSize: '1.4rem', fontWeight: '900', mb: 0 }}>GÜL DOĞAN</Typography>
        <Typography sx={{ fontSize: '0.9rem', opacity: 0.8 }}>Software Developer</Typography>
      </Box>

      {/* MENÜ LİSTESİ */}
      <List sx={{ px: 2 }}>
        {menu.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
            <ListItemButton 
              onClick={() => navigate(item.path)}
              sx={{ 
                borderRadius: '15px', 
                bgcolor: location.pathname === item.path ? 'rgba(255,255,255,0.2)' : 'transparent',
                transition: '0.3s',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', transform: 'translateX(8px)' } 
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: 45 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '13px', fontWeight: 'bold' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      {/* ÇIKIŞ YAP BUTONU */}
      <Box sx={{ mt: 'auto', p: 3 }}>
        <Button 
          fullWidth 
          variant="contained" 
          startIcon={<LogoutIcon />}
          onClick={logout} // Tıklayınca hafızayı siler ve login'e atar
          sx={{ 
            bgcolor: 'rgba(0,0,0,0.3)', 
            borderRadius: '12px', 
            fontWeight: 'bold',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' } 
          }}
        >
          ÇIKIŞ YAP
        </Button>
      </Box>
    </Box>
  ); // return kapandı
}; // fonksiyon kapandı

export default Sidebar;