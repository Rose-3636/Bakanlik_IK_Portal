import { useState, useEffect } from 'react';
// Avatar ve Stack kelimelerini sildik
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

export default function Puantaj() {
  const [personeller, setPersoneller] = useState<any[]>([]);
  const [kayitlar, setKayitlar] = useState<any>({});
  const gunler = Array.from({ length: 31 }, (_, i) => i + 1);

  // ÖNEMLİ: Kendi port numaranızı Swagger adresinden kontrol edip buraya yazın!
  const port = "7261"; 
  const apiUrl = `https://localhost:${port}/api/Puantaj`;
  const personelUrl = `https://localhost:${port}/api/Personel`;

  useEffect(() => {
    // 1. Personelleri Çek
    axios.get(personelUrl)
      .then(res => setPersoneller(res.data))
      .catch(()=> console.error("Personel çekilemedi:"));
    
    // 2. Puantaj Kayıtlarını Çek
    axios.get(apiUrl)
      .then(res => {
        const dataMap: any = {};
        res.data.forEach((k: any) => {
          dataMap[`${k.personelId}-${k.gun}`] = k.durum;
        });
        setKayitlar(dataMap);
      })
      .catch(err => console.error("Puantaj verisi çekilemedi:", err));
  }, []);

  const durumDegistir = (pId: number, gun: number) => {
    const key = `${pId}-${gun}`;
    const suankiDurum = kayitlar[key] || 'Calisti';
    let yeniDurum = suankiDurum === 'Calisti' ? 'Izinli' : suankiDurum === 'Izinli' ? 'Gelmedi' : 'Calisti';

    setKayitlar({ ...kayitlar, [key]: yeniDurum });

    axios.post(apiUrl, {
      personelId: pId,
      gun: gun,
      ay: 3,
      yil: 2026,
      durum: yeniDurum
    }).catch(() => alert("SQL'e kaydedilemedi. Backend açık mı?"));
  };

  const getIkon = (pId: number, gun: number) => {
    const durum = kayitlar[`${pId}-${gun}`] || 'Calisti';
    if (durum === 'Calisti') return <CheckCircleIcon sx={{ color: '#4caf50', fontSize: 18 }} />;
    if (durum === 'Izinli') return <BeachAccessIcon sx={{ color: '#2196f3', fontSize: 18 }} />;
    return <CancelIcon sx={{ color: '#f44336', fontSize: 18 }} />;
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" fontWeight="900" color="#802020" sx={{ mb: 4 }}>Puantaj Sistemi</Typography>
      <TableContainer component={Paper} sx={{ borderRadius: '25px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', overflowX: 'auto' }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: '900', bgcolor: '#f8fafc', minWidth: 200, position: 'sticky', left: 0, zIndex: 10 }}>AD SOYAD</TableCell>
              {gunler.map(gun => (
                <TableCell key={gun} align="center" sx={{ fontWeight: '900', bgcolor: '#f8fafc', minWidth: 35 }}>{gun}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {personeller.length === 0 ? (
              <TableRow><TableCell colSpan={32} align="center" sx={{ py: 5 }}>Veri yükleniyor veya API kapalı... Lütfen Visual Studio'yu kontrol edin.</TableCell></TableRow>
            ) : (
              personeller.map((p) => (
                <TableRow key={p.id}>
                  <TableCell sx={{ position: 'sticky', left: 0, bgcolor: 'white', zIndex: 5, borderRight: '1px solid #f1f5f9' }}>
                    <Typography variant="caption" fontWeight="900">{p.ad} {p.soyad}</Typography>
                  </TableCell>
                  {gunler.map(gun => (
                    <TableCell key={gun} align="center" onClick={() => durumDegistir(p.id, gun)} sx={{ cursor: 'pointer', borderLeft: '1px solid #f1f5f9' }}>
                      {getIkon(p.id, gun)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}