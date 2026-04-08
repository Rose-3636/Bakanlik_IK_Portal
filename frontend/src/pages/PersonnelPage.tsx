import { useEffect, useState } from 'react';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Avatar, IconButton, Button, Chip, Stack, TextField, InputAdornment 
} from '@mui/material';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function PersonnelPage() {
  const [personeller, setPersoneller] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  const verileriGetir = () => {
    // Kendi portuna göre düzenle
    axios.get('https://localhost:7063/api/Auth/all').then(res => setPersoneller(res.data));
  };

  useEffect(() => { verileriGetir(); }, []);

  const filtrelenmis = personeller.filter(p => 
    p.fullName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ width: '100%', animate: 'fade-in 0.4s ease' }}>
      {/* BAŞLIK VE EKLEME */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight={1000} color="#1e293b">Personel İdaresi (PA)</Typography>
          <Typography variant="body2" color="text.secondary">Tüm personel özlük dosyaları ve sicil yönetimi</Typography>
        </Box>
        <Button variant="contained" startIcon={<PersonAddIcon />} sx={{ bgcolor: '#800000', borderRadius: '12px' }}>
          YENİ SİCİL AÇ
        </Button>
      </Stack>

      {/* ARAMA VE FİLTRE */}
      <Paper sx={{ p: 2, mb: 4, borderRadius: '15px', display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField 
          placeholder="İsim veya Sicil No ile Ara..." 
          fullWidth 
          size="small"
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
            sx: { borderRadius: '10px' }
          }}
        />
      </Paper>

      {/* PERSONEL TABLOSU */}
      <TableContainer component={Paper} sx={{ borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: 'none' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8fafc' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 800 }}>PERSONEL</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>DEPARTMAN</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>ÜNVAN</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>DURUM</TableCell>
              <TableCell align="right" sx={{ fontWeight: 800 }}>İŞLEMLER</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtrelenmis.map((p) => (
              <TableRow key={p.id} hover>
                <TableCell>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ bgcolor: '#1e293b', fontWeight: 'bold' }}>{p.fullName[0]}</Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={800}>{p.fullName}</Typography>
                      <Typography variant="caption" color="text.secondary">Sicil: 000{p.id}</Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell><Typography variant="body2" fontWeight={600}>{p.department || 'Bakanlık Personeli'}</Typography></TableCell>
                <TableCell><Typography variant="body2" color="text.secondary">{p.role}</Typography></TableCell>
                <TableCell><Chip label="AKTİF" size="small" color="success" sx={{ fontWeight: 800, fontSize: 10 }} /></TableCell>
                <TableCell align="right">
                  <IconButton size="small" color="primary"><VisibilityIcon /></IconButton>
                  <IconButton size="small" color="secondary"><EditIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}