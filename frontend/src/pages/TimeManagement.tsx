import { useEffect, useState } from 'react';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Chip, Button, Stack, Avatar, Grid
} from '@mui/material'; 
import axios from 'axios';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function TimeManagement() {
  const [entries, setEntries] = useState<any[]>([]);

  useEffect(() => {
    // Backend portunu kontrol et (5234 veya 7063)
    axios.get('https://localhost:7063/api/Time')
      .then(res => setEntries(res.data))
      .catch(() => console.log("Veri çekilemedi"));
  }, []);

  return (
    <Box sx={{ width: '100%', pb: 5 }}>
      {/* BAŞLIK */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 5 }}>
        <Box>
          <Typography variant="overline" sx={{ color: '#800000', fontWeight: 1000, letterSpacing: 3 }}>
            TIME MANAGEMENT SYSTEM
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 1000, color: '#1e293b', mt: -1 }}>
            Zaman Yönetimi (PT)
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<DateRangeIcon />}
          sx={{ bgcolor: '#800000', borderRadius: '12px', px: 3, fontWeight: 'bold' }}
        >
          İZİN TALEBİ OLUŞTUR
        </Button>
      </Stack>

      <Grid container spacing={4}>
        {/* ÖZET KARTLARI */}
        <Grid size={{ xs: 12, md: 8 }}>
          <TableContainer component={Paper} sx={{ borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: 'none' }}>
            <Table>
              <TableHead sx={{ bgcolor: '#f8fafc' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 800 }}>PERSONEL</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>TARİH</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>KAYIT TÜRÜ</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>SÜRE</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 800 }}>DURUM</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {entries.map((e) => (
                  <TableRow key={e.id} hover>
                    <TableCell>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{ bgcolor: '#1e293b', width: 32, height: 32, fontSize: '0.8rem' }}>{e.employeeName[0]}</Avatar>
                        <Typography variant="body2" fontWeight={800}>{e.employeeName}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell sx={{ fontSize: '13px', color: '#64748b' }}>{new Date(e.date).toLocaleDateString('tr-TR')}</TableCell>
                    <TableCell>
                      <Chip label={e.entryType} size="small" sx={{ fontWeight: 900, fontSize: '10px', bgcolor: '#f1f5f9' }} />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 900, color: '#1e293b' }}>{e.hours}</TableCell>
                    <TableCell align="right">
                      {e.status === 'Onaylandı' ? (
                        <CheckCircleIcon color="success" fontSize="small" />
                      ) : (
                        <QueryBuilderIcon color="warning" fontSize="small" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {/* SAĞ TARAF: BİLGİ PANELİ */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 4, borderRadius: '24px', bgcolor: '#1e293b', color: 'white', height: '100%' }}>
            <Typography variant="h6" fontWeight={900} sx={{ mb: 3 }}>Mesai İstatistikleri</Typography>
            <Stack spacing={3}>
              <Box>
                <Typography variant="caption" sx={{ opacity: 0.6 }}>BU AY TOPLAM ÇALIŞMA</Typography>
                <Typography variant="h4" fontWeight={1000}>168 Saat</Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ opacity: 0.6 }}>KALAN YILLIK İZİN</Typography>
                <Typography variant="h4" fontWeight={1000} color="#fbbf24">14 Gün</Typography>
              </Box>
              <Box sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: '15px' }}>
                <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>SİSTEM NOTU</Typography>
                <Typography variant="body2">Tüm puantaj verileri ay sonunda otomatik olarak **Bordro (PY)** modülüne aktarılacaktır.</Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}