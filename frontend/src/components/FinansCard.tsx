import { Card, CardContent, Typography, Box, Stack } from '@mui/material';

interface FinansCardProps {
  baslik: string;
  tutar: string;
  ikon: React.ReactNode;
  renk: string;
}

const FinansCard = ({ baslik, tutar, ikon, renk }: FinansCardProps) => {
  return (
    <Card sx={{ 
      flex: 1, 
      minWidth: '280px', 
      borderRadius: '24px', 
      boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
      border: '1px solid #e2e8f0',
      transition: '0.3s',
      '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 15px 35px rgba(0,0,0,0.06)' }
    }}>
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="caption" fontWeight="900" color="text.secondary" sx={{ letterSpacing: 1 }}>
              {baslik.toUpperCase()}
            </Typography>
            <Typography variant="h4" fontWeight="900" sx={{ mt: 1, color: '#0f172a' }}>
              {tutar}
            </Typography>
          </Box>
          <Box sx={{ 
            p: 1.5, 
            borderRadius: '16px', 
            bgcolor: `${renk}15`, 
            color: renk,
            display: 'flex'
          }}>
            {ikon}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default FinansCard;