import { useEffect, useState } from 'react';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Chip, Button, LinearProgress, 
  InputAdornment, TextField, Stack, Avatar
} from '@mui/material'; 
// Grid importunu ana paketten yapıyoruz
import Grid from '@mui/material/Grid'; 
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

// Veri Tipi Tanımı
interface Islem {
  id: number;
  tarih: string;
  aciklama: string;
  islemTuru: string;
  tutar: number;
}

export default function FinansDashboard() {
  const [hesaplar, setHesaplar] = useState<any[]>([]);
  const [hareketler, setHareketler] = useState<Islem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Veri Çekme (Port 7063)
  const verileriGetir = () => {
    const baseUrl = `https://localhost:7063/api/Hesap`;
    axios.get(baseUrl).then(res => setHesaplar(res.data)).catch(() => {});
    axios.get(`${baseUrl}/Yevmiye`).then(res => setHareketler(res.data)).catch(() => {});
  };

  useEffect(() => { verileriGetir(); }, []);

  const kasaBakiyesi = hesaplar.find(h => h.hesapKodu === 100)?.bakiye || 0;
  const harcananYuzde = 68;

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', p: 2 }}>
      
      {/* 1. ÜST HEADER ALANI */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 5 }}>
        <Box>
          <Typography variant="overline" sx={{ color: '#800000', fontWeight: 800, letterSpacing: 3 }}>
            T.C. AİLE VE SOSYAL HİZMETLER BAKANLIĞI
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 1000, color: '#1e293b', mt: -1 }}>
            Finans Takip Sistemi
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          sx={{ 
            bgcolor: '#1e293b', borderRadius: '12px', px: 3, py: 1.5, fontWeight: 'bold',
            boxShadow: '0 10px 15px -3px rgba(30, 41, 59, 0.3)',
            '&:hover': { bgcolor: '#0f172a' }
          }}
        >
          YENİ FİŞ GİRİŞİ
        </Button>
      </Stack>

      {/* 2. ANALİZ KARTLARI (MUI v6 size sistemi ile kırmızılar sönüyor) */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomStatCard 
            label="MERKEZ KASA BAKİYESİ" 
            value={`₺${kasaBakiyesi.toLocaleString('tr-TR')}`} 
            icon={<TrendingUpIcon />} 
            color="#1e293b" 
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomStatCard 
            label="KULLANILABİLİR ÖDENEK" 
            value="₺12.800.000" 
            icon={<AccountBalanceWalletIcon />} 
            color="#166534" 
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 4, borderRadius: '20px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', border: '1px solid #e2e8f0' }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: '#94a3b8' }}>BÜTÇE DOLULUK ORANI</Typography>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 900 }}>%{harcananYuzde}</Typography>
              <LinearProgress 
                variant="determinate" 
                value={harcananYuzde} 
                sx={{ flex: 1, height: 10, borderRadius: 5, bgcolor: '#f1f5f9', '& .MuiLinearProgress-bar': { bgcolor: '#800000' } }} 
              />
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* 3. ANA TABLO BÖLÜMÜ */}
      <Paper sx={{ borderRadius: '20px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <Box sx={{ p: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9' }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b' }}>Son Finansal Hareketler</Typography>
          <TextField 
            placeholder="Arama yapın..." 
            size="small"
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#94a3b8' }} /></InputAdornment>,
              sx: { borderRadius: '10px', bgcolor: '#f8fafc', minWidth: 300 }
            }}
          />
        </Box>
        
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ bgcolor: '#f8fafc' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 800, color: '#64748b', fontSize: '12px' }}>TARİH</TableCell>
                <TableCell sx={{ fontWeight: 800, color: '#64748b', fontSize: '12px' }}>AÇIKLAMA</TableCell>
                <TableCell sx={{ fontWeight: 800, color: '#64748b', fontSize: '12px' }}>TÜR</TableCell>
                <TableCell align="right" sx={{ fontWeight: 800, color: '#64748b', fontSize: '12px' }}>TUTAR</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hareketler.filter(h => h.aciklama.toLowerCase().includes(searchQuery.toLowerCase())).map((h) => (
                <TableRow key={h.id} hover>
                  <TableCell sx={{ color: '#94a3b8', fontSize: '13px' }}>{new Date(h.tarih).toLocaleDateString('tr-TR')}</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>{h.aciklama}</TableCell>
                  <TableCell>
                    <Chip 
                      label={h.islemTuru} 
                      size="small" 
                      sx={{ fontWeight: 800, fontSize: '10px', bgcolor: h.islemTuru === 'BORC' ? '#ecfdf5' : '#fff1f2', color: h.islemTuru === 'BORC' ? '#059669' : '#e11d48' }} 
                    />
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 900 }}>
                    ₺{h.tutar.toLocaleString('tr-TR')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

    </Box>
  );
}

// --- FIGMA STYLE STAT CARD (size ve item içermez, hatasızdır) ---
const CustomStatCard = ({ label, value, icon, color }: any) => (
  <Paper sx={{ p: 4, borderRadius: '20px', border: '1px solid #e2e8f0', position: 'relative', overflow: 'hidden' }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <Box>
        <Typography variant="caption" sx={{ fontWeight: 800, color: '#94a3b8', letterSpacing: 1.5 }}>{label}</Typography>
        <Typography variant="h4" sx={{ fontWeight: 900, color: '#1e293b', mt: 1 }}>{value}</Typography>
      </Box>
      <Avatar sx={{ bgcolor: `${color}15`, color: color, borderRadius: '12px' }}>
        {icon}
      </Avatar>
    </Box>
    <Box sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '4px', bgcolor: color }} />
  </Paper>
);