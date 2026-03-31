import { useEffect, useState, useRef } from 'react'; // useRef ekledik
import { Box, Card, Typography, Stack, Avatar, Divider, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Button, Grid } from '@mui/material';
import axios from 'axios';
import PrintIcon from '@mui/icons-material/Print';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useAuth } from '../context/AuthContext';

// PDF İÇİN LAZIM OLANLAR
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function Bordro() {
  const [personel, setPersonel] = useState<any>(null);
  const bordroRef = useRef<HTMLDivElement>(null); // Fotoğrafı çekilecek alanı işaretliyoruz
  const { showNotify } = useAuth();
  const port = "7261"; 

  useEffect(() => {
    axios.get(`https://localhost:${port}/api/Personel`)
      .then(res => { if(res.data.length > 0) setPersonel(res.data[0]); })
      .catch(err => console.log(err));
  }, []);

  // --- SİHİRLİ PDF İNDİRME FONKSİYONU ---
  const handleDownloadPDF = async () => {
    if (!bordroRef.current) return;
    
    showNotify("Bordro hazırlanıyor, lütfen bekleyin...", "info");

    const canvas = await html2canvas(bordroRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const componentWidth = pdf.internal.pageSize.getWidth();
    const componentHeight = (canvas.height * componentWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
    pdf.save(`${personel.ad}_${personel.soyad}_Bordro.pdf`);
    
    showNotify("Bordro başarıyla indirildi!", "success");
  };

  if (!personel) return <Typography sx={{p:5}}>Yükleniyor...</Typography>;

  const brutMaas = personel.maas;
  const sgkKesinti = brutMaas * 0.14;
  const vergiKesinti = brutMaas * 0.15;
  const netMaas = brutMaas - sgkKesinti - vergiKesinti;

  return (
    <Box sx={{ width: '100%', pb: 5 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="900" color="#802020">Maaş Bordrosu</Typography>
          <Typography variant="body2" color="text.secondary" fontWeight="bold">Resmi Maaş Pusulası</Typography>
        </Box>
        {/* BUTONA FONKSİYONU BAĞLADIK */}
        <Button 
          variant="contained" 
          startIcon={<PrintIcon />} 
          onClick={handleDownloadPDF}
          sx={{ bgcolor: '#802020', borderRadius: '12px', fontWeight: 'bold' }}
        >
          PDF OLARAK İNDİR
        </Button>
      </Stack>

      {/* ref={bordroRef} diyerek "Burayı fotoğrafla" dedik */}
      <div ref={bordroRef} style={{ background: '#f4f7f9', padding: '10px' }}>
        <Card sx={{ borderRadius: '32px', p: 4, border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', bgcolor: 'white' }}>
          <Stack direction="row" spacing={3} alignItems="center" sx={{ mb: 4 }}>
            <Avatar sx={{ width: 80, height: 80, bgcolor: '#802020', fontSize: '2rem', fontWeight: 'bold' }}>{personel.ad[0]}</Avatar>
            <Box>
              <Typography variant="h5" fontWeight="900">{personel.ad} {personel.soyad}</Typography>
              <Typography variant="subtitle2" color="text.secondary">{personel.departman} - Mart 2026</Typography>
            </Box>
          </Stack>

          <Divider sx={{ mb: 4 }} />

          <Box sx={{ display: 'flex', gap: 4 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" fontWeight="900" color="#2e7d32" sx={{ mb: 2 }}>KAZANÇLAR</Typography>
              <TableContainer component={Paper} elevation={0} sx={{ bgcolor: '#f0fff4', borderRadius: '20px' }}>
                <Table size="small">
                  <TableBody>
                    <TableRow><TableCell>Brüt Maaş</TableCell><TableCell align="right">₺{brutMaas.toLocaleString()}</TableCell></TableRow>
                    <TableRow><TableCell>Ek Ödemeler</TableCell><TableCell align="right">₺4.500</TableCell></TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" fontWeight="900" color="#d32f2f" sx={{ mb: 2 }}>KESİNTİLER</Typography>
              <TableContainer component={Paper} elevation={0} sx={{ bgcolor: '#fff5f5', borderRadius: '20px' }}>
                <Table size="small">
                  <TableBody>
                    <TableRow><TableCell>SGK (%14)</TableCell><TableCell align="right">-₺{sgkKesinti.toLocaleString()}</TableCell></TableRow>
                    <TableRow><TableCell>Vergi (%15)</TableCell><TableCell align="right">-₺{vergiKesinti.toLocaleString()}</TableCell></TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>

          <Box sx={{ mt: 5, p: 4, borderRadius: '24px', background: '#1e293b', color: 'white', textAlign: 'center' }}>
             <Typography variant="h6" sx={{ opacity: 0.7 }}>NET ÖDENECEK</Typography>
             <Typography variant="h2" fontWeight="900">₺{netMaas.toLocaleString()}</Typography>
          </Box>
        </Card>
      </div>
    </Box>
  );
}