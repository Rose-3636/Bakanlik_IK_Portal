import { Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Avatar, Button } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FlightIcon from '@mui/icons-material/Flight';
import LogoutIcon from '@mui/icons-material/Logout';
import myPhoto from '../assets/foti.png';

// 1. ADIM: Sidebar'ın dışarıdan bir fonksiyon alacağını buraya yazdık (TypeScript için)
interface SidebarProps {
  sayfaDegistir: (sayfaAdi: string) => void;
}

const Sidebar = ({ sayfaDegistir }: SidebarProps) => {
  const menu = [
    { text: 'DASHBOARD', icon: <DashboardIcon />, key: 'dashboard' },
    { text: 'PERSONEL', icon: <PeopleIcon />, key: 'personel' },
    { text: 'PUANTAJ', icon: <DateRangeIcon />, key: 'puantaj' },
    { text: 'BORDRO', icon: <AssignmentIcon />, key: 'bordro' },
    { text: 'İZİN YÖNETİMİ', icon: <FlightIcon />, key: 'izin' },
  ];

  return (
    <Box sx={{ width: 280, bgcolor: '#802020', color: 'white', height: '100vh', position: 'fixed', display: 'flex', flexDirection: 'column', left: 0, top: 0 }}>
      
      {/* LOGO ALANI */}
      <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        {/* Logo Alanı - Uyarı vermeyen profesyonel yöntem */}
<Box
  component="img" // Box bileşenine "sen bir resimsin" dedik
  src="https://www.aile.gov.tr/media/4336/logo-department.svg"
  alt="Logo"
  sx={{
    width: 70,
    height: 70,
    filter: 'brightness(0) invert(1)', // Logoyu beyaz yapar
    display: 'block'
  }}
/>
        <Typography variant="h5" fontWeight="900" sx={{ letterSpacing: 1 }}>İK PORTAL</Typography>
      </Box>

      {/* PROFİL BİLGİSİ */}
      <Box sx={{ px: 3, mb: 4, textAlign: 'center' }}>
        <Avatar src={myPhoto} sx={{ width: 120, height: 120, mx: 'auto', mb: 2, border: '3px solid white' }} />
        <Typography sx={{ fontSize: '1.4rem', fontWeight: '900', color: 'white', mb: 0 }}>GÜL DOĞAN</Typography>
        <Typography sx={{ fontSize: '1rem', opacity: 0.8 }}>Software Developer</Typography>
      </Box>

      {/* MENÜ LİSTESİ - BURAYA DİKKAT! */}
      <List sx={{ px: 2 }}>
        {menu.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
            <ListItemButton 
              // 2. ADIM: Tıklandığında sayfaDegistir fonksiyonunu çalıştırıyoruz
              onClick={() => sayfaDegistir(item.key)}
              sx={{ 
                borderRadius: '15px', 
                transition: '0.3s',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', transform: 'translateX(5px)' } 
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: 45 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '14px', fontWeight: 'bold' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      <Box sx={{ mt: 'auto', p: 3 }}>
        <Button fullWidth sx={{ color: 'white', fontWeight: 'bold' }} startIcon={<LogoutIcon />}>ÇIKIŞ YAP</Button>
      </Box>
    </Box>
  );
};

export default Sidebar;