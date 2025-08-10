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
  PeopleAltOutlined,
  GavelOutlined,
  AssignmentOutlined,
  ListAltOutlined,
  SecurityOutlined,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

// Admin menu items
const adminMenuItems = [
  { label: 'Dashboard Overview', path: '', icon: <SecurityOutlined /> },
  { label: 'User Management', path: 'users', icon: <PeopleAltOutlined /> },
  { label: 'Policy Management', path: 'policies', icon: <GavelOutlined /> },
  { label: 'DSAR Requests', path: 'dsar', icon: <AssignmentOutlined /> },
  { label: 'Audit Logs', path: 'auditlogs', icon: <ListAltOutlined /> },
];

export default function AdminSidebar({ isOpen, onClose }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); 
  const navigate = useNavigate();
  const location = useLocation();

  // Get current last part of the URL
  const active = location.pathname.split('/').pop();

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
      {/* Sidebar Header */}
      <Box display="flex" alignItems="center" p={2}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Admin
        </Typography>
        <IconButton onClick={onClose}>
          <ChevronLeftIcon />
        </IconButton>
      </Box>

      <Divider sx={{ mt: -1 }} />

      {/* Menu List */}
      <List sx={{ mt: 1.8 }}>
        {adminMenuItems.map((item) => {
          const isActive = active === item.path || (active === '' && item.path === '');
          return (
            <ListItemButton
              key={item.path}
              selected={isActive}
              onClick={() => {
                navigate(`/dashboard/admin/${item.path}`);
              }}
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
