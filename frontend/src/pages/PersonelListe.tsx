import { useEffect, useState } from 'react';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Avatar, Chip, Button, IconButton, Dialog, 
  DialogTitle, DialogContent, DialogActions, TextField, Stack, InputAdornment,
  Skeleton 
} from '@mui/material';
import { 
  Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon, 
  Search as SearchIcon, FileDownload as FileDownloadIcon, PhotoCamera 
} from '@mui/icons-material';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { useAuth } from '../context/AuthContext';
import kendiFotim from '../assets/foti.png';

interface Personel {
  id: number; ad: string; soyad: string; departman: string; maas: number; resimUrl?: string;
}

export default function PersonelListe() {
  const [personeller, setPersoneller] = useState<Personel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [currentPersonel, setCurrentPersonel] = useState<any>({ ad: '', soyad: '', departman: '', maas: 0, resimUrl: '' });
  
  // 1. ADIM: Hafızadan hem bildirimleri hem de giriş yapan kullanıcının bilgilerini aldık
  const { showNotify, user } = useAuth();

  const port = "7261"; 
  const apiUrl = `https://localhost:${port}/api/Personel`;

  const verileriGetir = () => {
    setLoading(true);
    axios.get(apiUrl)
      .then(res => {
        setPersoneller(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => verileriGetir(), []);

  const filtrelenmisPersoneller = personeller.filter(p => 
    (p.ad + " " + p.soyad).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileUpload = async (event: any) => {
    const file = event.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('dosya', file);
    try {
      const res = await axios.post(`${apiUrl}/ResimYukle`, formData);
      setCurrentPersonel({ ...currentPersonel, resimUrl: res.data.url });
      showNotify("Fotoğraf yüklendi!", "success");
    } catch (err) {
      showNotify("Yükleme hatası!", "error");
    }
  };

  const handleSil = (id: number) => {
    if (window.confirm("Bu personeli silmek istediğinize emin misiniz?")) {
      axios.delete(`${apiUrl}/${id}`).then(() => {
        verileriGetir();
        showNotify("Personel kaydı silindi.", "warning");
      });
    }
  };

  const handleKaydet = () => {
    const istek = currentPersonel.id ? axios.put(`${apiUrl}/${currentPersonel.id}`, currentPersonel) : axios.post(apiUrl, currentPersonel);
    istek.then(() => { 
      setOpen(false); 
      verileriGetir(); 
      showNotify("İşlem başarıyla kaydedildi.", "success");
    });
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="900" color="#802020">Personel Yönetimi</Typography>
        <Stack direction="row" spacing={2}>
            <Button variant="outlined" startIcon={<FileDownloadIcon />} onClick={() => {
                const data = personeller.map(p => ({ "AD SOYAD": p.ad + " " + p.soyad, "DEPARTMAN": p.departman, "MAAŞ": p.maas }));
                const ws = XLSX.utils.json_to_sheet(data);
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "Personeller");
                XLSX.writeFile(wb, "Personel_Listesi.xlsx");
                showNotify("Excel indiriliyor...", "info");
            }} sx={{ color: '#2e7d32', borderColor: '#2e7d32' }}>EXCEL</Button>
            
            {/* 2. ADIM: SADECE ADMİNSE 'YENİ EKLE' BUTONUNU GÖSTER */}
            {user?.role === 'Admin' && (
              <Button 
                variant="contained" 
                startIcon={<AddIcon />} 
                sx={{ bgcolor: '#802020', borderRadius: '12px' }} 
                onClick={() => { setOpen(true); setCurrentPersonel({ ad: '', soyad: '', departman: '', maas: 0, resimUrl: '' }); }}
              >
                YENİ EKLE
              </Button>
            )}
        </Stack>
      </Stack>

      <TextField
        fullWidth placeholder="İsim ile arayın..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3, bgcolor: 'white', '& .MuiOutlinedInput-root': { borderRadius: '15px' } }}
        InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }}
      />

      <TableContainer component={Paper} sx={{ borderRadius: '25px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', border: 'none' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8fafc' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>PERSONEL</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>DEPARTMAN</TableCell>
              {/* 3. ADIM: EĞER ADMİN DEĞİLSE İŞLEMLER BAŞLIĞINI GİZLE VEYA GÖSTER */}
              {user?.role === 'Admin' && <TableCell align="right" sx={{ fontWeight: 'bold' }}>İŞLEMLER</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              [1, 2, 3, 4, 5].map((item) => (
                <TableRow key={item}>
                  <TableCell><Stack direction="row" spacing={2} alignItems="center"><Skeleton variant="circular" width={45} height={45} /><Skeleton variant="text" width={150} /></Stack></TableCell>
                  <TableCell><Skeleton variant="text" width={100} /></TableCell>
                  <TableCell align="right"><Skeleton variant="circular" width={30} height={30} /></TableCell>
                </TableRow>
              ))
            ) : (
              filtrelenmisPersoneller.map((p) => (
                <TableRow key={p.id} hover>
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar src={p.ad === 'Gül' ? kendiFotim : p.resimUrl} sx={{ width: 45, height: 45, border: '2px solid white' }}>{p.ad[0]}</Avatar>
                      <Typography fontWeight="bold" color="#1e293b">{p.ad} {p.soyad}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{p.departman}</TableCell>
                  
                  {/* 4. ADIM: SADECE ADMİNSE DÜZENLEME VE SİLME BUTONLARINI GÖSTER */}
                  {user?.role === 'Admin' && (
                    <TableCell align="right">
                      <IconButton color="primary" onClick={() => { setCurrentPersonel(p); setOpen(true); }}><EditIcon fontSize="small" /></IconButton>
                      <IconButton color="error" onClick={() => handleSil(p.id)}><DeleteIcon fontSize="small" /></IconButton>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle sx={{fontWeight:'bold'}}>Personel Detayı</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2, alignItems: 'center' }}>
            <Avatar src={currentPersonel.resimUrl} sx={{ width: 100, height: 100, border: '4px solid #f1f5f9' }} />
            <Button variant="outlined" component="label" startIcon={<PhotoCamera />} sx={{ textTransform: 'none' }}>
              Foti Seç <input type="file" hidden onChange={handleFileUpload} />
            </Button>
            <TextField label="Ad" fullWidth value={currentPersonel.ad} onChange={(e) => setCurrentPersonel({...currentPersonel, ad: e.target.value})} />
            <TextField label="Soyad" fullWidth value={currentPersonel.soyad} onChange={(e) => setCurrentPersonel({...currentPersonel, soyad: e.target.value})} />
            <TextField label="Departman" fullWidth value={currentPersonel.departman} onChange={(e) => setCurrentPersonel({...currentPersonel, departman: e.target.value})} />
            <TextField label="Maaş" type="number" fullWidth value={currentPersonel.maas} onChange={(e) => setCurrentPersonel({...currentPersonel, maas: Number(e.target.value)})} />
          </Stack>
        </DialogContent>
        <DialogActions sx={{p:3}}>
          <Button onClick={() => setOpen(false)}>Kapat</Button>
          <Button variant="contained" sx={{bgcolor:'#802020'}} onClick={handleKaydet}>Kaydet</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}