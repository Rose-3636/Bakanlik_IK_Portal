import { Box } from '@mui/material';
import Sidebar from './Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setTab: (tab: string) => void;
  user: any;
  onLogout: () => void;
}

export default function MainLayout({ children, activeTab, setTab, user, onLogout }: MainLayoutProps) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F1F5F9' }}>
      <Sidebar activeTab={activeTab} setTab={setTab} user={user} onLogout={onLogout} />
      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
        {children}
      </Box>
    </Box>
  );
}