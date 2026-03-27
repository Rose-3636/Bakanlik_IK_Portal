import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

// TypeScript'e bu kartın hangi bilgileri alacağını söylüyoruz
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

const StatCard = ({ title, value, icon, color }: StatCardProps) => {
  return (
    <Card sx={{ 
      borderRadius: '24px', 
      height: 180, 
      position: 'relative', 
      overflow: 'hidden', 
      boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
      border: '1px solid #e2e8f0',
      transition: '0.3s',
      '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 15px 35px rgba(0,0,0,0.08)' }
    }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="caption" fontWeight="900" color="text.secondary" sx={{ letterSpacing: 1 }}>
          {title}
        </Typography>
        <Typography variant="h2" fontWeight="900" sx={{ mt: 2, color: '#1e293b' }}>
          {value}
        </Typography>
        
        {/* Arka plandaki o dev şeffaf ikon efekti */}
        <Box sx={{ 
          position: 'absolute', 
          right: -20, 
          bottom: -20, 
          fontSize: 140, 
          color: color, 
          opacity: 0.07,
          display: 'flex'
        }}>
          {icon}
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard;