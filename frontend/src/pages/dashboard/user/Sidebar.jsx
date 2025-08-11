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
//   DashboardOutlined,
  PolicyOutlined,
  AssignmentTurnedInOutlined,
  HelpOutlineOutlined,
  LogoutOutlined,
  AssignmentOutlined,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const menuItems = [

  { label: 'My Policies', path: '', icon: <PolicyOutlined /> },
  { label: 'DSAR', path: 'dsar', icon: <AssignmentOutlined /> },
  { label: 'Help & Support', path: 'help', icon: <HelpOutlineOutlined /> },
  
  { label: 'Logout', path: 'logout', icon: <LogoutOutlined /> },
   
];

export default function UserSidebar({ isOpen, onClose }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();

  const active = location.pathname.split('/').pop();

  const handleMenuClick = (path) => {
    if (path === 'logout') {
      localStorage.removeItem('token');
      navigate('/login');
      return;
    }
    navigate(`/dashboard/user/${path}`);
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
          User Panel
        </Typography>
        <IconButton onClick={onClose}>
          <ChevronLeftIcon />
        </IconButton>
      </Box>

      <Divider sx={{ mt: -1 }} />

      <List sx={{ mt: 1.8 }}>
        {menuItems.map((item) => {
          const isActive =
            active === item.path || (active === '' && item.path === '');
          return (
            <ListItemButton
              key={item.path}
              selected={isActive}
              onClick={() => handleMenuClick(item.path)}
            >
              <ListItemIcon
                sx={{
                  color: isActive ? theme.palette.primary.main : 'inherit',
                }}
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
