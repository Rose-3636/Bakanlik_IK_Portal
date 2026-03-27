import { useEffect, useState } from 'react';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Chip, Button, Stack, Dialog, DialogTitle, 
  DialogContent, DialogActions, TextField, MenuItem, Avatar 
} from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import axios from 'axios';

// 1. ADIM: Kendi fotoğrafınızı buraya da davet ediyoruz
import kendiFotim from '../assets/foti.png'; 

export default function IzinYonetimi() {
  const [talepler, setTalepler] = useState<any[]>([]);
  const [personeller, setPersoneller] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  
  const [yeniTalep, setYeniTalep] = useState({
    personelId: '',
    izinTuru: 'Yıllık İzin',
    durum: 'Bekliyor',
    baslangicTarihi: new Date().toISOString().split('T')[0],
    bitisTarihi: new Date().toISOString().split('T')[0]
  });

  const port = "7261"; 
  const baseApi = `https://localhost:${port}/api`;

  const verileriGetir = async () => {
    try {
      const [personelRes, izinRes] = await Promise.all([
        axios.get(`${baseApi}/Personel`),
        axios.get(`${baseApi}/Izin`)
      ]);
      setPersoneller(personelRes.data);
      setTalepler(izinRes.data);
    } catch (err) {
      console.error("Veri çekme hatası:", err);
    }
  };

  useEffect(() => { verileriGetir(); }, []);

  // --- FOTİ VE İSİM BULAN AKILLI FONKSİYON ---
  const getPersonelBilgi = (id: number) => {
    const p = personeller.find(x => x.id === id);
    if (!p) return { adSoyad: `Personel #${id}`, foti: '' };

    return { 
      adSoyad: `${p.ad} ${p.soyad}`, 
      // 2. ADIM: Eğer isim 'Gül' ise bizim foti.png'yi kullan, değilse SQL'deki linki kullan
      foti: p.ad === 'Gül' ? kendiFotim : p.resimUrl 
    };
  };

  const handleKaydet = () => {
    axios.post(`${baseApi}/Izin`, yeniTalep).then(() => {
        setOpen(false);
        verileriGetir();
        alert("Talep oluşturuldu!");
    });
  };

  const handleOnayla = (id: number) => {
    axios.put(`${baseApi}/Izin/${id}/onayla`).then(() => verileriGetir());
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="900" color="#802020">İzin Yönetimi</Typography>
          <Typography variant="body2" color="text.secondary" fontWeight="bold">Personel taleplerini fotoğraflı olarak takip edin.</Typography>
        </Box>
        <Button variant="contained" startIcon={<FlightTakeoffIcon />} onClick={() => setOpen(true)} sx={{ bgcolor: '#802020', borderRadius: '12px', fontWeight: 'bold' }}>
          YENİ TALEP OLUŞTUR
        </Button>
      </Stack>

      <TableContainer component={Paper} sx={{ borderRadius: '25px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', border: 'none' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8fafc' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: '900', color: '#64748b' }}>PERSONEL</TableCell>
              <TableCell sx={{ fontWeight: '900', color: '#64748b' }}>İZİN TÜRÜ</TableCell>
              <TableCell sx={{ fontWeight: '900', color: '#64748b' }}>DURUM</TableCell>
              <TableCell align="right" sx={{ fontWeight: '900', color: '#64748b' }}>İŞLEMLER</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {talepler.map((t) => {
              const pBilgi = getPersonelBilgi(t.personelId);
              return (
                <TableRow key={t.id} hover>
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      {/* 3. ADIM: Avatar artık pBilgi.foti üzerinden sizin resminizi basacak */}
                      <Avatar src={pBilgi.foti} sx={{ width: 40, height: 40, border: '2px solid #f1f5f9' }}>
                        {pBilgi.adSoyad[0]}
                      </Avatar>
                      <Typography sx={{ fontWeight: 'bold', color: '#1e293b' }}>{pBilgi.adSoyad}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{t.izinTuru}</TableCell>
                  <TableCell>
                    <Chip label={t.durum} color={t.durum === 'Onaylandı' ? 'success' : 'warning'} size="small" sx={{ fontWeight: 'bold' }} />
                  </TableCell>
                  <TableCell align="right">
                    {t.durum === 'Bekliyor' && (
                      <Button variant="contained" color="success" size="small" onClick={() => handleOnayla(t.id)} sx={{ borderRadius: '8px', fontWeight: 'bold' }}>
                        ONAYLA
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle sx={{ fontWeight: '900', color: '#802020' }}>Yeni İzin Talebi</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField select label="Personel Seçin" fullWidth value={yeniTalep.personelId} onChange={(e) => setYeniTalep({...yeniTalep, personelId: e.target.value})}>
                {personeller.map(p => (<MenuItem key={p.id} value={p.id}>{p.ad} {p.soyad}</MenuItem>))}
            </TextField>
            <TextField select label="İzin Türü" fullWidth value={yeniTalep.izinTuru} onChange={(e) => setYeniTalep({...yeniTalep, izinTuru: e.target.value})}>
                <MenuItem value="Yıllık İzin">Yıllık İzin</MenuItem>
                <MenuItem value="Mazeret İzni">Mazeret İzni</MenuItem>
                <MenuItem value="Sağlık İzni">Sağlık İzni</MenuItem>
            </TextField>
            <TextField label="Başlangıç" type="date" fullWidth InputLabelProps={{ shrink: true }} value={yeniTalep.baslangicTarihi} onChange={(e) => setYeniTalep({...yeniTalep, baslangicTarihi: e.target.value})} />
            <TextField label="Bitiş" type="date" fullWidth InputLabelProps={{ shrink: true }} value={yeniTalep.bitisTarihi} onChange={(e) => setYeniTalep({...yeniTalep, bitisTarihi: e.target.value})} />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpen(false)} sx={{ fontWeight: 'bold', color: 'text.secondary' }}>İptal</Button>
          <Button variant="contained" onClick={handleKaydet} sx={{ bgcolor: '#802020', borderRadius: '8px' }}>GÖNDER</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}