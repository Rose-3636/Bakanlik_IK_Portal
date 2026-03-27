import { useEffect, useState } from 'react';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Avatar, Chip, Button, IconButton, Dialog, 
  DialogTitle, DialogContent, DialogActions, TextField, Stack, InputAdornment 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import axios from 'axios';
import * as XLSX from 'xlsx';
import kendiFotim from '../assets/foti.png'; // Sizin gerçek fotoğrafınız

// 1. ADIM: TypeScript'e 'resimUrl' gelebileceğini öğrettik
interface Personel {
  id: number; 
  ad: string; 
  soyad: string; 
  departman: string; 
  maas: number;
  resimUrl?: string; // Soru işareti 'boş olabilir' demek
}

export default function PersonelListe() {
  const [personeller, setPersoneller] = useState<Personel[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [currentPersonel, setCurrentPersonel] = useState<any>({ ad: '', soyad: '', departman: '', maas: 0 });
  const port = "7261"; // Kendi port numaranızı kontrol edin
  const apiUrl = `https://localhost:${port}/api/Personel`;

  const verileriGetir = () => {
    axios.get(apiUrl).then(res => setPersoneller(res.data)).catch(err => console.log(err));
  };

  useEffect(() => verileriGetir(), []);

  const filtrelenmişPersoneller = personeller.filter(p => 
    (p.ad + " " + p.soyad).toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.departman.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportExcel = () => {
    const excelVerisi = filtrelenmişPersoneller.map(p => ({
      "AD": p.ad,
      "SOYAD": p.soyad,
      "DEPARTMAN": p.departman,
      "MAAŞ": p.maas,
    }));
    const sayfa = XLSX.utils.json_to_sheet(excelVerisi);
    const kitap = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(kitap, sayfa, "Personeller");
    XLSX.writeFile(kitap, "Personel_Listesi.xlsx");
  };

  const handleSil = (id: number) => {
    if (window.confirm("Bu personeli silmek istediğinize emin misiniz?")) {
      axios.delete(`${apiUrl}/${id}`).then(() => verileriGetir());
    }
  };

  const handleKaydet = () => {
    const istek = currentPersonel.id 
      ? axios.put(`${apiUrl}/${currentPersonel.id}`, currentPersonel) 
      : axios.post(apiUrl, currentPersonel);

    istek.then(() => {
      setOpen(false);
      verileriGetir();
    });
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="900" color="#802020">Personel Yönetimi</Typography>
        <Stack direction="row" spacing={2}>
            <Button variant="outlined" startIcon={<FileDownloadIcon />} onClick={handleExportExcel} sx={{ borderColor: '#2e7d32', color: '#2e7d32', fontWeight: 'bold' }}>EXCEL</Button>
            <Button variant="contained" startIcon={<AddIcon />} sx={{ bgcolor: '#802020', borderRadius: '10px', fontWeight: 'bold' }} onClick={() => { setCurrentPersonel({ ad: '', soyad: '', departman: '', maas: 0 }); setOpen(true); }}>YENİ PERSONEL</Button>
        </Stack>
      </Stack>

      <TextField
        fullWidth placeholder="Personel ara..." variant="outlined" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3, bgcolor: 'white', '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
        InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }}
      />

      <TableContainer component={Paper} sx={{ borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: 'none' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8fafc' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>PERSONEL</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>DEPARTMAN</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>DURUM</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>İŞLEMLER</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtrelenmişPersoneller.map((p) => (
              <TableRow key={p.id} hover>
                <TableCell>
                  <Stack direction="row" spacing={2} alignItems="center">
                    {/* 2. ADIM: AKILLI AVATAR (Resim varsa onu, yoksa harfi gösterir) */}
                    <Avatar 
  // İŞTE SİHİRLİ DOKUNUŞ:
  src={p.ad === 'Gül' ? kendiFotim : p.resimUrl} 
  sx={{ 
    width: 45, 
    height: 45, 
    border: '2px solid #f1f5f9', 
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)' 
  }}
>
  {p.ad[0]}
</Avatar>
                    <Typography fontWeight="bold" color="#1e293b">{p.ad} {p.soyad}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>{p.departman}</TableCell>
                <TableCell align="center"><Chip label="Aktif" color="success" size="small" sx={{ fontWeight: 'bold' }} /></TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => { setCurrentPersonel(p); setOpen(true); }}><EditIcon fontSize="small" /></IconButton>
                  <IconButton color="error" onClick={() => handleSil(p.id)}><DeleteIcon fontSize="small" /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle sx={{ fontWeight: '900', color: '#802020' }}>Personel Formu</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Ad" fullWidth value={currentPersonel.ad} onChange={(e) => setCurrentPersonel({...currentPersonel, ad: e.target.value})} />
            <TextField label="Soyad" fullWidth value={currentPersonel.soyad} onChange={(e) => setCurrentPersonel({...currentPersonel, soyad: e.target.value})} />
            <TextField label="Departman" fullWidth value={currentPersonel.departman} onChange={(e) => setCurrentPersonel({...currentPersonel, departman: e.target.value})} />
            <TextField label="Maaş" type="number" fullWidth value={currentPersonel.maas} onChange={(e) => setCurrentPersonel({...currentPersonel, maas: Number(e.target.value)})} />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpen(false)}>İptal</Button>
          <Button variant="contained" sx={{ bgcolor: '#802020' }} onClick={handleKaydet}>Kaydet</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}