import { Box, Typography, Stack, Card } from '@mui/material';

const Header = () => {
  return (
    <Card sx={{ borderRadius: '20px', mb: 4, p: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
      <Stack direction="row" alignItems="center" spacing={3}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
           <img src="https://www.aile.gov.tr/media/4336/logo-department.svg" width="60" height="60" alt="Logo" />
        </Box>
       <Box>
  {/* Üstteki Yazı */}
  <Typography 
    variant="h5" 
    fontWeight="900" 
    color="#802020" 
    sx={{ 
      letterSpacing: 0.5, 
      lineHeight: 1.2, // Bu satır harf yüksekliğini ayarlar
      mb: 1.1 // İŞTE BURASI: Altındaki yazı ile arasını açar (1, 1.5 veya 2 yapabilirsin)
    }}
  >
    T.C. AİLE VE SOSYAL HİZMETLER BAKANLIĞI
  </Typography>

  {/* Alttaki Yazı */}
  <Typography variant="body2" color="text.secondary" fontWeight="bold">
    İNSAN KAYNAKLARI YÖNETİM PORTALI
  </Typography>
</Box>
      </Stack>
    </Card>
  );
};
export default Header;