import { useEffect, useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Stack, Chip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CampaignIcon from '@mui/icons-material/Campaign';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function DuyuruYonetimi() {
  const [duyurular, setDuyurular] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [yeniDuyuru, setYeniDuyuru] = useState({ baslik: '', icerik: '', kategori: 'İK' });
  const { showNotify } = useAuth();
  
  const port = "7261"; // Portunu kontrol et
  const apiUrl = `https://localhost:${port}/api/Duyuru`;

  const verileriGetir = () => {
    axios.get(apiUrl).then(res => setDuyurular(res.data)).catch(err => console.log(err));
  };

  useEffect(() => verileriGetir(), []);

  const handleKaydet = () => {
    axios.post(apiUrl, yeniDuyuru).then(() => {
      setOpen(false);
      verileriGetir();
      showNotify("Duyuru başarıyla yayınlandı!", "success");
    });
  };

  const handleSil = (id: number) => {
    if (window.confirm("Bu duyuruyu silmek istediğinize emin misiniz?")) {
      axios.delete(`${apiUrl}/${id}`).then(() => {
        verileriGetir();
        showNotify("Duyuru kaldırıldı.", "warning");
      });
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="900" color="#802020">Duyuru Yönetimi</Typography>
          <Typography variant="body2" color="text.secondary" fontWeight="bold">Kurumsal duyuruları buradan ekleyip silebilirsiniz.</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)} sx={{ bgcolor: '#802020', borderRadius: '12px', fontWeight: 'bold' }}>
          YENİ DUYURU EKLE
        </Button>
      </Stack>

      <TableContainer component={Paper} sx={{ borderRadius: '25px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', border: 'none' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8fafc' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>BAŞLIK</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>KATEGORİ</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>TARİH</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>İŞLEMLER</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {duyurular.map((d) => (
              <TableRow key={d.id} hover>
                <TableCell sx={{ fontWeight: 'bold' }}>{d.baslik}</TableCell>
                <TableCell><Chip label={d.kategori} size="small" color="primary" sx={{ fontWeight: 'bold' }} /></TableCell>
                <TableCell color="text.secondary">{new Date(d.tarih).toLocaleDateString('tr-TR')}</TableCell>
                <TableCell align="right">
                  <IconButton color="error" onClick={() => handleSil(d.id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 'bold' }}>Yeni Duyuru Yayınla</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField label="Duyuru Başlığı" fullWidth value={yeniDuyuru.baslik} onChange={(e) => setYeniDuyuru({ ...yeniDuyuru, baslik: e.target.value })} />
            <TextField label="Duyuru İçeriği" multiline rows={4} fullWidth value={yeniDuyuru.icerik} onChange={(e) => setYeniDuyuru({ ...yeniDuyuru, icerik: e.target.value })} />
            <TextField label="Kategori" fullWidth value={yeniDuyuru.kategori} onChange={(e) => setYeniDuyuru({ ...yeniDuyuru, kategori: e.target.value })} placeholder="İK, Eğitim, Genel vb." />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpen(false)}>İptal</Button>
          <Button variant="contained" onClick={handleKaydet} sx={{ bgcolor: '#802020', borderRadius: '8px' }}>YAYINLA</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}