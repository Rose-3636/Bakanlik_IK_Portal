import { useEffect, useState } from 'react';
import { Box, Typography, Divider, Paper, Stack, Chip, CircularProgress } from '@mui/material';
import axios from 'axios';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import StorageIcon from '@mui/icons-material/Storage';
import ComputerIcon from '@mui/icons-material/Computer';
import DnsIcon from '@mui/icons-material/Dns';

export default function SistemDurum() {
  const [durum, setDurum] = useState<any>(null);
  const port = "7063"; 

  useEffect(() => {
    axios.get(`https://localhost:${port}/api/Hesap/SistemDurum`)
      .then(res => setDurum(res.data))
      .catch(err => console.error("Sistem verisi alınamadı:", err));
  }, []);

  if (!durum) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>
  );

  return (
    <Box sx={{ width: '100%', pb: 5 }}>
      <Typography variant="h4" fontWeight="900" color="#0f172a" sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <SettingsSuggestIcon sx={{ fontSize: 40, color: '#802020' }} /> Sistem Bilgileri
      </Typography>

      <Paper sx={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 10px 40px rgba(0,0,0,0.04)' }}>
        
        {/* BÖLÜM 1: KULLANIM VERİLERİ */}
        <Box sx={{ p: 4, bgcolor: '#f8fafc', display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            <Box sx={{ flex: 1, minWidth: '150px' }}><Typography variant="caption" color="text.secondary">Kullanıcı</Typography><Typography fontWeight="900">{durum.kullanici}</Typography></Box>
            <Box sx={{ flex: 1, minWidth: '150px' }}><Typography variant="caption" color="text.secondary">Oturum Tarihi</Typography><Typography fontWeight="900">{durum.tarih}</Typography></Box>
            <Box sx={{ flex: 1, minWidth: '150px' }}><Typography variant="caption" color="text.secondary">Sunucu Saati</Typography><Typography fontWeight="900">{durum.sistemSaati}</Typography></Box>
        </Box>

        <Divider />

        {/* BÖLÜM 2: YAZILIM BİLGİLERİ */}
        <Box sx={{ p: 4, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            <Box sx={{ flex: 1, minWidth: '150px' }}><Typography variant="caption" color="text.secondary">Versiyon</Typography><Box sx={{mt:0.5}}><Chip label={durum.uygulamaVersiyonu} size="small" color="primary" sx={{fontWeight:'bold'}} /></Box></Box>
            <Box sx={{ flex: 1, minWidth: '150px' }}><Typography variant="caption" color="text.secondary">Platform</Typography><Typography fontWeight="900">.NET 8 / React</Typography></Box>
            <Box sx={{ flex: 1, minWidth: '150px' }}><Typography variant="caption" color="text.secondary">Dil</Typography><Typography fontWeight="900">Unicode (UTF-8)</Typography></Box>
        </Box>

        <Divider />

        {/* BÖLÜM 3: SUNUCU VE ALTYAPI */}
        <Box sx={{ p: 4, bgcolor: '#f1f5f9', display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            <Box sx={{ flex: 1, minWidth: '200px' }}><Stack direction="row" spacing={1} alignItems="center"><ComputerIcon sx={{fontSize:16, color:'#64748b'}}/><Typography variant="caption">İşletim Sistemi</Typography></Stack><Typography fontWeight="900" sx={{fontSize:12}}>{durum.isletimSistemi}</Typography></Box>
            <Box sx={{ flex: 1, minWidth: '200px' }}><Stack direction="row" spacing={1} alignItems="center"><DnsIcon sx={{fontSize:16, color:'#64748b'}}/><Typography variant="caption">Sunucu Adı</Typography></Stack><Typography fontWeight="900">{durum.sunucuAdi}</Typography></Box>
            <Box sx={{ flex: 1, minWidth: '200px' }}><Stack direction="row" spacing={1} alignItems="center"><StorageIcon sx={{fontSize:16, color:'#2e7d32'}}/><Typography variant="caption">Veritabanı</Typography></Stack><Typography fontWeight="900" color="#2e7d32">{durum.veritabaniSürümü}</Typography></Box>
        </Box>

      </Paper>
    </Box>
  );
}