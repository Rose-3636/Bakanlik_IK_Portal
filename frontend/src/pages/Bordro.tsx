import { useEffect, useState } from 'react';
import { 
  Box, Card, Typography, Stack, Avatar, Divider, Table, TableBody, 
  TableCell, TableContainer, TableRow, Paper, Button 
} from '@mui/material';
import axios from 'axios';
import PrintIcon from '@mui/icons-material/Print';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

export default function Bordro() {
  const [personel, setPersonel] = useState<any>(null);
  const port = "7261"; // Kendi port numaranızı kontrol edin

  useEffect(() => {
    axios.get(`https://localhost:${port}/api/Personel`)
      .then(res => {
        if(res.data.length > 0) setPersonel(res.data[0]);
      })
      .catch(err => console.log("Bordro verisi çekilemedi:", err));
  }, []);

  if (!personel) return (
    <Box sx={{ p: 5, textAlign: 'center' }}><Typography>Yükleniyor...</Typography></Box>
  );

  const brutMaas = personel.maas;
  const sgkKesinti = brutMaas * 0.14;
  const vergiKesinti = brutMaas * 0.15;
  const netMaas = brutMaas - sgkKesinti - vergiKesinti;

  return (
    <Box sx={{ width: '100%', pb: 5 }}>
      {/* ÜST BAŞLIK */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="900" color="#802020">Maaş Bordrosu</Typography>
          <Typography variant="body2" color="text.secondary" fontWeight="bold">Mart 2026 Dönemi Maaş Detayları</Typography>
        </Box>
        <Button variant="contained" startIcon={<PrintIcon />} sx={{ bgcolor: '#802020', borderRadius: '12px', fontWeight: 'bold', textTransform: 'none' }}>
          PDF OLARAK İNDİR
        </Button>
      </Stack>

      <Card sx={{ borderRadius: '32px', p: 4, border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', bgcolor: 'white' }}>
        <Stack direction="row" spacing={3} alignItems="center" sx={{ mb: 4 }}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: '#802020', fontSize: '2rem', fontWeight: 'bold' }}>{personel.ad[0]}</Avatar>
          <Box>
            <Typography variant="h5" fontWeight="900">{personel.ad} {personel.soyad}</Typography>
            <Typography variant="subtitle2" color="text.secondary">{personel.departman} - Personel No: #{personel.id}</Typography>
          </Box>
        </Stack>

        <Divider sx={{ mb: 4 }} />

        {/* HATASIZ YENİ YAPI: Düz Box ve Flex kullandık */}
        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {/* Kazançlar */}
          <Box sx={{ flex: 1, minWidth: '300px' }}>
            <Typography variant="subtitle1" fontWeight="900" color="#2e7d32" sx={{ mb: 2 }}>KAZANÇLAR</Typography>
            <TableContainer component={Paper} elevation={0} sx={{ bgcolor: '#f0fff4', borderRadius: '20px', border: '1px solid #e8f5e9' }}>
              <Table size="small">
                <TableBody>
                  <TableRow><TableCell sx={{ fontWeight: 'bold' }}>Temel Brüt Maaş</TableCell><TableCell align="right">₺{brutMaas.toLocaleString()}</TableCell></TableRow>
                  <TableRow><TableCell sx={{ fontWeight: 'bold' }}>Yol ve Yemek Yardımı</TableCell><TableCell align="right">₺4.500</TableCell></TableRow>
                  <TableRow><TableCell sx={{ fontWeight: '900', color: '#1b5e20' }}>TOPLAM BRÜT</TableCell><TableCell align="right" sx={{ fontWeight: '900', color: '#1b5e20' }}>₺{(brutMaas + 4500).toLocaleString()}</TableCell></TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Kesintiler */}
          <Box sx={{ flex: 1, minWidth: '300px' }}>
            <Typography variant="subtitle1" fontWeight="900" color="#d32f2f" sx={{ mb: 2 }}>KESİNTİLER</Typography>
            <TableContainer component={Paper} elevation={0} sx={{ bgcolor: '#fff5f5', borderRadius: '20px', border: '1px solid #ffebee' }}>
              <Table size="small">
                <TableBody>
                  <TableRow><TableCell sx={{ fontWeight: 'bold' }}>SGK İşçi Payı (%14)</TableCell><TableCell align="right">-₺{sgkKesinti.toLocaleString()}</TableCell></TableRow>
                  <TableRow><TableCell sx={{ fontWeight: 'bold' }}>Gelir Vergisi (%15)</TableCell><TableCell align="right">-₺{vergiKesinti.toLocaleString()}</TableCell></TableRow>
                  <TableRow><TableCell sx={{ fontWeight: '900', color: '#b71c1c' }}>TOPLAM KESİNTİ</TableCell><TableCell align="right" sx={{ fontWeight: '900', color: '#b71c1c' }}>-₺{(sgkKesinti + vergiKesinti).toLocaleString()}</TableCell></TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>

        <Box sx={{ 
          mt: 5, p: 4, borderRadius: '24px', 
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', 
          color: 'white', textAlign: 'center'
        }}>
           <Typography variant="h6" sx={{ opacity: 0.7, letterSpacing: 1 }}>ÖDENECEK NET TUTAR</Typography>
           <Typography variant="h2" fontWeight="900" sx={{ my: 1 }}>₺{netMaas.toLocaleString()}</Typography>
           <Stack direction="row" justifyContent="center" spacing={1} alignItems="center" sx={{ mt: 2 }}>
              <AccountBalanceWalletIcon sx={{ color: '#4caf50' }} />
              <Typography variant="body2" fontWeight="bold">Tutar Maaş Hesabınıza Aktarılacaktır</Typography>
           </Stack>
        </Box>
      </Card>
    </Box>
  );
}