import { useEffect, useState } from 'react';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, LinearProgress, Button, Stack, Dialog, 
  DialogTitle, DialogContent, TextField, MenuItem, DialogActions 
} from '@mui/material'; 
import StarsIcon from '@mui/icons-material/Stars';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Yolu bir kez daha kontrol edin

export default function PerformansYonetimi() {
  const [notlar, setNotlar] = useState<any[]>([]);
  const [personeller, setPersoneller] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const { showNotify } = useAuth();
  
  const [yeniNot, setYeniNot] = useState({ personelId: '', puan: 0, yorum: '', donem: '2026 - 1. Çeyrek' });

  const port = "7063"; // Kendi port numaranızı kontrol edin!
  
  // ✅ DÜZELTİLDİ: Ters tırnak (backtick) kullanıldı!
  const baseApi = `https://localhost:${port}/api`; 

  const verileriGetir = async () => {
    try {
      const [pRes, nRes] = await Promise.all([
        axios.get(`${baseApi}/Personel`),
        axios.get(`${baseApi}/Performans`)
      ]);
      setPersoneller(pRes.data);
      setNotlar(nRes.data);
    } catch (err) {
      console.error("Veri çekme hatası:", err);
    }
  };

  useEffect(() => { verileriGetir(); }, []);

  const handleKaydet = () => {
    // Küçük bir kontrol: Puan 0-100 arası mı?
    if (yeniNot.puan < 0 || yeniNot.puan > 100) {
      showNotify("Puan 0 ile 100 arasında olmalıdır!", "warning");
      return;
    }

    axios.post(`${baseApi}/Performans`, yeniNot).then(() => {
      setOpen(false);
      verileriGetir();
      showNotify("Performans notu başarıyla kaydedildi!", "success");
    }).catch(() => showNotify("Bir hata oluştu!", "error"));
  };

  const getPersonelAd = (id: number) => {
    const p = personeller.find(x => x.id === id);
    return p ? `${p.ad} ${p.soyad}` : `Personel #${id}`;
  };

  return (
    <Box sx={{ width: '100%', pb: 5 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="900" color="#802020" sx={{ fontFamily: "'Segoe UI', sans-serif" }}>
            Performans Yönetimi
          </Typography>
          <Typography variant="body2" color="text.secondary" fontWeight="bold">Çalışan yetkinlik ve gelişim takibi</Typography>
        </Box>
        <Button variant="contained" startIcon={<StarsIcon />} onClick={() => setOpen(true)} sx={{ bgcolor: '#802020', borderRadius: '12px', fontWeight: 'bold', textTransform: 'none' }}>
          YENİ DEĞERLENDİRME
        </Button>
      </Stack>

      <TableContainer component={Paper} sx={{ borderRadius: '25px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', border: 'none' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8fafc' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>PERSONEL</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>DÖNEM</TableCell>
              <TableCell sx={{ fontWeight: 'bold', width: '30%' }}>PERFORMANS SKORU</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>YORUM</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notlar.map((n) => (
              <TableRow key={n.id} hover>
                <TableCell sx={{ fontWeight: 'bold' }}>{getPersonelAd(n.personelId)}</TableCell>
                <TableCell>{n.donem}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <LinearProgress 
                      variant="determinate" 
                      value={n.puan} 
                      sx={{ 
                        flexGrow: 1, height: 8, borderRadius: 5,
                        bgcolor: '#f1f5f9',
                        '& .MuiLinearProgress-bar': { bgcolor: n.puan >= 80 ? '#4caf50' : n.puan >= 60 ? '#ff9800' : '#f44336' }
                      }} 
                    />
                    <Typography variant="body2" fontWeight="900">{n.puan}</Typography>
                  </Stack>
                </TableCell>
                <TableCell sx={{ color: 'text.secondary', fontSize: '13px' }}>{n.yorum}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle sx={{ fontWeight: 'bold', color: '#802020' }}>Yeni Performans Değerlendirmesi</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField select label="Personel Seçin" fullWidth value={yeniNot.personelId} onChange={(e) => setYeniNot({...yeniNot, personelId: e.target.value})}>
                {personeller.map(p => (<MenuItem key={p.id} value={p.id}>{p.ad} {p.soyad}</MenuItem>))}
            </TextField>
            <TextField label="Puan (0-100)" type="number" fullWidth value={yeniNot.puan} onChange={(e) => setYeniNot({...yeniNot, puan: Number(e.target.value)})} />
            <TextField label="Yönetici Notu" multiline rows={3} fullWidth value={yeniNot.yorum} onChange={(e) => setYeniNot({...yeniNot, yorum: e.target.value})} />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpen(false)} sx={{ color: 'text.secondary' }}>İptal</Button>
          <Button variant="contained" sx={{ bgcolor: '#802020', borderRadius: '8px' }} onClick={handleKaydet}>NOTU KAYDET</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}