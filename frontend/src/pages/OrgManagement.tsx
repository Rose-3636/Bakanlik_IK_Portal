import { Box, Typography, Paper, Grid, Avatar, Stack, Divider } from '@mui/material';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import BusinessIcon from '@mui/icons-material/Business';
import GroupsIcon from '@mui/icons-material/Groups';

export default function OrgManagement() {
  return (
    <Box sx={{ width: '100%', pb: 5 }}>
      <Typography variant="h4" fontWeight="1000" color="#1e293b" sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <AccountTreeIcon sx={{ fontSize: 40, color: '#800000' }} /> Organizasyon Yönetimi (OM)
      </Typography>

      <Grid container spacing={4}>
        {/* ŞİRKET YAPISI ÖZETİ */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 4, borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 10px 40px rgba(0,0,0,0.03)' }}>
            <Typography variant="h6" fontWeight="900" sx={{ mb: 3 }}>Kurumsal Hiyerarşi</Typography>
            
            <Stack spacing={3}>
              <OrgUnit label="T.C. AİLE VE SOSYAL HİZMETLER BAKANLIĞI" type="Merkez Teşkilatı" color="#800000" />
              <Box sx={{ ml: 8, borderLeft: '2px dashed #cbd5e1', pl: 4, py: 1 }}>
                <OrgUnit label="Strateji Geliştirme Başkanlığı" type="Daire Başkanlığı" color="#1e293b" />
                <Box sx={{ ml: 8, borderLeft: '2px dashed #cbd5e1', pl: 4, py: 1, mt: 2 }}>
                  <OrgUnit label="Bütçe ve Performans Birimi" type="Alt Birim" color="#64748b" />
                  <OrgUnit label="Finansal Raporlama Servisi" type="Alt Birim" color="#64748b" />
                </Box>
              </Box>
            </Stack>
          </Paper>
        </Grid>

        {/* SAĞ TARAF: İSTATİSTİKLER */}
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <StatSmallCard icon={<BusinessIcon />} label="Toplam Birim" value="14" color="#1e293b" />
            <StatSmallCard icon={<GroupsIcon />} label="Yönetici Kadrosu" value="28" color="#800000" />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

// Alt Bileşenler
const OrgUnit = ({ label, type, color }: any) => (
  <Paper variant="outlined" sx={{ p: 2, borderRadius: '15px', display: 'flex', alignItems: 'center', gap: 2, borderLeft: `8px solid ${color}` }}>
    <Avatar sx={{ bgcolor: color }}><BusinessIcon fontSize="small" /></Avatar>
    <Box>
      <Typography sx={{ fontWeight: 900, fontSize: '0.9rem' }}>{label}</Typography>
      <Typography variant="caption" color="text.secondary">{type}</Typography>
    </Box>
  </Paper>
);

const StatSmallCard = ({ icon, label, value, color }: any) => (
  <Paper sx={{ p: 3, borderRadius: '20px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
    <Box sx={{ color: color, mb: 1 }}>{icon}</Box>
    <Typography variant="caption" fontWeight="bold" color="text.secondary">{label}</Typography>
    <Typography variant="h4" fontWeight="1000">{value}</Typography>
  </Paper>
);