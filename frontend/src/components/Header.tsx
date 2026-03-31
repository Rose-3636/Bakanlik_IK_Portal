import { Box, Typography, Card, Stack, useMediaQuery, useTheme } from '@mui/material';

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card sx={{ borderRadius: '20px', mb: 4, p: isMobile ? 1.5 : 2.5, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
      <Stack direction="row" alignItems="center" spacing={isMobile ? 1.5 : 3}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src="https://www.aile.gov.tr/media/4336/logo-department.svg" width={isMobile ? "40" : "60"} alt="Logo" />
        </Box>
        <Box>
          <Typography variant={isMobile ? "subtitle2" : "h5"} fontWeight="900" color="#802020" sx={{ lineHeight: 1.2 }}>
            T.C. AİLE VE SOSYAL HİZMETLER BAKANLIĞI
          </Typography>
          {!isMobile && (
            <Typography variant="body2" color="text.secondary" fontWeight="bold">
              İNSAN KAYNAKLARI YÖNETİM PORTALI
            </Typography>
          )}
        </Box>
      </Stack>
    </Card>
  );
}