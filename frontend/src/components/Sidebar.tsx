import React from 'react';
import profilResmi from '../assets/foti.png';
import { 
  Box, ListItemButton, ListItemIcon, ListItemText, 
  Typography, InputBase, Avatar, Divider 
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountTreeIcon from '@mui/icons-material/AccountTree'; 
import PersonSearchIcon from '@mui/icons-material/PersonSearch'; 
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder'; 
import PaymentsIcon from '@mui/icons-material/Payments'; 

import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';

interface SidebarProps {
  onLogout: () => void;
  user: any;
  activeTab: string;
  setTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout, user, activeTab, setTab }) => {
  return (
    <Box sx={{ 
      width: 320, height: '100vh', bgcolor: '#800000', color: 'white', 
      display: 'flex', flexDirection: 'column', flexShrink: 0,
      boxShadow: '10px 0 30px rgba(0,0,0,0.3)'
    }}>
      
      {/* 1. ÜST LOGO BÖLÜMÜ - DÜZELTİLDİ VE ORTALANDI */}
      <Box sx={{ pt: 4, pb: 2, textAlign: 'center' }}>
        <Box 
          component="img" 
          src="https://www.aile.gov.tr/media/4336/logo-department.svg"
          alt="Logo"
          sx={{ 
            width: 75, 
            filter: 'brightness(0) invert(1)', 
            mb: 2,
            display: 'block', // Blok yaparak yanındaki her şeyi aşağı iter
            mx: 'auto'        // Sağdan ve soldan otomatik boşluk vererek tam ortalar
          }}
        />
        <Typography variant="h6" sx={{ fontWeight: 1000, letterSpacing: 2, fontSize: '0.85rem', opacity: 0.9 }}>
          BAKANLIK FİNANS PORTALI
        </Typography>
      </Box>

      {/* 2. PROFİL KARTI - İSİM "GÜL DOĞAN" OLARAK GÜNCELLENDİ */}
      <Box sx={{ px: 3, py: 2 }}>
        <Box sx={{ 
          bg: 'rgba(0,0,0,0.2)', borderRadius: '24px', p: 3, 
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)'
        }}>
          <Avatar 
            src={profilResmi} 
            sx={{ width: 85, height: 85, border: '3px solid white', mb: 2, boxShadow: 6 }} 
          />
     

<Typography sx={{ fontSize: '1.2rem', fontWeight: 1000, textTransform: 'uppercase', letterSpacing: 1 }}>
  {user || 'GÜL DOĞAN'} 
</Typography>
          <Typography sx={{ fontSize: '0.7rem', opacity: 0.6, fontWeight: 700, tracking: 1.5 }}>
            SOFTWARE DEVELOPER
          </Typography>
        </Box>
      </Box>

      {/* 3. ARAMA ÇUBUĞU */}
      <Box sx={{ px: 3, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'rgba(0,0,0,0.2)', borderRadius: '12px', px: 2, py: 1 }}>
          <SearchIcon sx={{ fontSize: 18, opacity: 0.5, mr: 1 }} />
          <InputBase placeholder="Hızlı İşlem Ara..." sx={{ color: 'white', fontSize: '0.8rem', width: '100%' }} />
        </Box>
      </Box>

      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.05)', mx: 3, mb: 2 }} />

      {/* 4. MENÜ LİSTESİ */}
      <Box sx={{ flex: 1, overflowY: 'auto', px: 2 }}>
        <Typography variant="caption" sx={{ opacity: 0.4, fontWeight: 900, ml: 2, mb: 1, display: 'block' }}>ANA MENÜ</Typography>
        <MenuLink Icon={DashboardIcon} label="Genel Bakış" active={activeTab === 'dashboard'} onClick={() => setTab('dashboard')} />

        <Typography variant="caption" sx={{ opacity: 0.4, fontWeight: 900, ml: 2, mt: 3, mb: 1, display: 'block' }}>HCM SÜREÇLERİ</Typography>
        <MenuLink Icon={AccountTreeIcon} label="Organizasyon Yönetimi" active={activeTab === 'org'} onClick={() => setTab('org')} />
        <MenuLink Icon={PersonSearchIcon} label="Personel İdaresi" active={activeTab === 'personnel'} onClick={() => setTab('personnel')} />
        <MenuLink Icon={QueryBuilderIcon} label="Zaman Yönetimi" active={activeTab === 'time'} onClick={() => setTab('time')} />
        <MenuLink Icon={PaymentsIcon} label="Bordro Yönetimi" active={activeTab === 'payroll'} onClick={() => setTab('payroll')} />
      </Box>

      {/* 5. EN ALT ÇIKIŞ BUTONU */}
      <Box sx={{ p: 3 }}>
        <ListItemButton 
          onClick={onLogout} 
          sx={{ 
            borderRadius: '16px', bgcolor: 'white', color: '#800000',
            justifyContent: 'center', py: 1.8,
            '&:hover': { bgcolor: '#f1f1f1' },
            boxShadow: '0 10px 20px rgba(0,0,0,0.3)'
          }}
        >
          <ListItemIcon sx={{ color: 'inherit', minWidth: 30 }}><LogoutIcon fontSize="small" /></ListItemIcon>
          <Typography sx={{ fontSize: '0.85rem', fontWeight: 1000, tracking: 1 }}>GÜVENLİ ÇIKIŞ</Typography>
        </ListItemButton>
      </Box>
    </Box>
  );
};

// Alt Menü Bileşeni
const MenuLink = ({ Icon, label, active, onClick }: { Icon: any, label: string, active?: boolean, onClick: () => void }) => (
  <ListItemButton 
    onClick={onClick}
    sx={{ 
      borderRadius: '12px', mb: 0.5, py: 1.2,
      bgcolor: active ? 'rgba(255,255,255,0.95)' : 'transparent',
      color: active ? '#800000' : 'rgba(255,255,255,0.8)',
      '&:hover': { bgcolor: active ? 'white' : 'rgba(255,255,255,0.1)' },
      transition: '0.3s'
    }}
  >
    <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
      <Icon fontSize="small" />
    </ListItemIcon>
    <ListItemText primary={label} primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: active ? 1000 : 500 }} />
  </ListItemButton>
);

export default Sidebar;