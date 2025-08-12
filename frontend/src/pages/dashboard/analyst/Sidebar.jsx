import React from 'react';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  HomeOutlined,
  NotificationsActiveOutlined,
  TrendingUpOutlined,
  FormatListBulletedOutlined,
  LogoutOutlined,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const menuItems = [
  { label: 'Overview', path: '', icon: <HomeOutlined /> },
  { label: 'Live Alerts', path: 'live', icon: <NotificationsActiveOutlined /> },
  { label: 'Alert Trends', path: 'trends', icon: <TrendingUpOutlined /> },
  { label: 'Case Queue', path: 'cases', icon: <FormatListBulletedOutlined /> },
{ label: 'Vulnerability Dashboard', path: 'vulnerability', icon: <NotificationsActiveOutlined /> },
{ label: 'Audit Logs', path: 'auditlogs', icon: <FormatListBulletedOutlined /> },
 { label: 'Logout', path: 'logout', icon: <LogoutOutlined /> },
];

export default function Sidebar({ isOpen, onClose }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Not used here but handy later
  const navigate = useNavigate();
  const location = useLocation();

  const active = location.pathname.split('/').pop();
   const handleMenuClick = (path) => {
    if (path === 'logout') {
      localStorage.removeItem('token');
      navigate('/login');
      return;
    }
    navigate(`/dashboard/analyst/${path}`);
  };
  return (
    <Drawer
      variant="persistent"
      open={isOpen}
      onClose={onClose}
      anchor="left"
      sx={{
        width: drawerWidth,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          bgcolor: theme.palette.background.paper,
        },
      }}
    >
      <Box display="flex" alignItems="center" p={2}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Analyst 
        </Typography>
        {/*  Always show close icon */}
        <IconButton onClick={onClose}>
          <ChevronLeftIcon />
        </IconButton>
      </Box>

      <Divider sx={{ mt: -1}}/>

      
      <List sx={{ mt: 1.8 }}>
        {menuItems.map((item) => {
          const isActive = active === item.path || (active === '' && item.path === '');
          return (
            <ListItemButton
              key={item.path}
              selected={isActive}
              
                onClick={() => handleMenuClick(item.path)}
             
            >
              <ListItemIcon
                sx={{ color: isActive ? theme.palette.primary.main : 'inherit' }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          );
        })}
      </List>
      
    </Drawer>
  );
}
