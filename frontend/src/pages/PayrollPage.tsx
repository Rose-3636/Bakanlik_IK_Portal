import { useState } from 'react';
import { 
  Box, Typography, Paper, TextField, Button, Divider, Stack, IconButton 
} from '@mui/material';
// Grid importunu en güvenli yoldan yapıyoruz
import Grid from '@mui/material/Grid'; 
import axios from 'axios';
import PaymentsIcon from '@mui/icons-material/Payments';
import CalculateIcon from '@mui/icons-material/Calculate';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

export default function PayrollPage() {
  const [brut, setBrut] = useState<number>(0);
  const [sonuc, setSonuc] = useState<any>(null);

  const hesapla = () => {
    if (brut <= 0) {
      alert("Lütfen geçerli bir brüt tutar giriniz!");
      return;
    }
    // Backend Portu: 7063 veya 5234 olduğunu Swagger'dan kontrol et!
    axios.get(`https://localhost:7063/api/Payroll/calculate/${brut}`)
      .then(res => {
        setSonuc(res.data);
      })
      .catch(() => alert("Hesaplama servisine ulaşılamadı."));
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', pb: 5 }}>
      
      {/* 1. ÜST BAŞLIK ALANI */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="overline" sx={{ color: '#800000', fontWeight: 1000, letterSpacing: 4, display: 'block' }}>
          FINANCIAL SERVICES
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 1000, color: '#1e293b', display: 'flex', alignItems: 'center', gap: 2, mt: -1 }}>
          <PaymentsIcon sx={{ fontSize: 45, color: '#800000' }} /> Bordro Simülasyonu
        </Typography>
      </Box>

      {/* 2. GRID SİSTEMİ (Size propu ile hatalar sönüyor) */}
      <Grid container spacing={5}>
        
        {/* SOL: GİRİŞ PANELİ */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: '20px', border: '1px solid #e2e8f0', bgcolor: 'white' }}>
            <Typography variant="h6" sx={{ fontWeight: 900, mb: 4, color: '#1e293b' }}>Maaş Parametreleri</Typography>
            
            <TextField 
              fullWidth 
              label="Aylık Brüt Maaş (₺)" 
              type="number" 
              variant="outlined"
              placeholder="Örn: 55000"
              onChange={(e) => setBrut(Number(e.target.value))}
              InputProps={{ sx: { borderRadius: '14px', fontWeight: 'bold' } }}
              sx={{ mb: 4 }}
            />

            <Button 
              fullWidth 
              variant="contained" 
              onClick={hesapla}
              startIcon={<CalculateIcon />}
              sx={{ 
                bgcolor: '#1e293b', py: 2, borderRadius: '14px', fontWeight: 1000, fontSize: '1rem',
                boxShadow: '0 10px 20px rgba(30, 41, 59, 0.2)',
                '&:hover': { bgcolor: '#0f172a' }
              }}
            >
              HESAPLA
            </Button>
          </Paper>
        </Grid>

        {/* SAĞ: BORDRO GÖRÜNÜMÜ */}
        <Grid size={{ xs: 12, md: 8 }}>
          {sonuc ? (
            <Paper elevation={0} sx={{ borderRadius: '24px', border: '2px solid #e2e8f0', overflow: 'hidden', bgcolor: 'white', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}>
              
              <Box sx={{ bgcolor: '#1e293b', color: 'white', p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 900, letterSpacing: 1 }}>MAAŞ PUSULASI (PAYSLIP)</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.7 }}>T.C. Aile ve Sosyal Hizmetler Bakanlığı | Mart 2026</Typography>
                </Box>
                <IconButton sx={{ color: 'white' }} onClick={() => window.print()}>
                  <LocalPrintshopIcon />
                </IconButton>
              </Box>

              <Box sx={{ p: 5 }}>
                <Stack spacing={3}>
                  <BordroRow label="BRÜT ÜCRET TOPLAMI" value={sonuc.Brut} isBold color="#1e293b" />
                  <Divider />
                  <BordroRow label="SGK İşçi Kesintisi (%15)" value={sonuc.Ssk} color="#991b1b" />
                  <BordroRow label="Gelir Vergisi + Damga Vergisi" value={sonuc.GelirVergisi + sonuc.DamgaVergisi} color="#991b1b" />
                  <BordroRow label="TOPLAM KESİNTİ" value={sonuc.KesintiToplami} isBold color="#991b1b" />
                  
                  <Box sx={{ 
                    mt: 4, p: 4, bgcolor: '#f0fdf4', borderRadius: '20px', 
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    border: '1px solid #dcfce7' 
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <VerifiedUserIcon sx={{ color: '#166534', fontSize: 30 }} />
                      <Typography sx={{ fontWeight: 1000, color: '#166534', fontSize: '1.2rem' }}>NET ÖDENECEK</Typography>
                    </Box>
                    <Typography variant="h3" sx={{ fontWeight: 1000, color: '#166534', tracking: -2 }}>
                      ₺{sonuc.Net.toLocaleString('tr-TR')}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Paper>
          ) : (
            <Box sx={{ 
              height: '100%', minHeight: '400px', border: '2px dashed #cbd5e1', 
              borderRadius: '24px', display: 'flex', flexDirection: 'column', 
              alignItems: 'center', justifyContent: 'center', bgcolor: 'rgba(255,255,255,0.3)' 
            }}>
              <PaymentsIcon sx={{ fontSize: 80, color: '#cbd5e1', mb: 2 }} />
              <Typography color="text.secondary" sx={{ fontWeight: 700 }}>
                Analiz için brüt maaş değerini giriniz.
              </Typography>
            </Box>
          )}
        </Grid>

      </Grid>
    </Box>
  );
}

const BordroRow = ({ label, value, isBold, color }: any) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <Typography sx={{ fontWeight: isBold ? 1000 : 600, color: isBold ? '#1e293b' : '#64748b', fontSize: isBold ? '1.1rem' : '1rem' }}>
      {label}
    </Typography>
    <Typography sx={{ fontWeight: 1000, color: color, fontSize: isBold ? '1.2rem' : '1.1rem' }}>
      ₺{value?.toLocaleString('tr-TR')}
    </Typography>
  </Box>
);