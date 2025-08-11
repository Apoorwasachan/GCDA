import React, { useState, useEffect } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import AdminSidebar from './sidebar';
import MenuIcon from '@mui/icons-material/Menu';
import { Outlet } from 'react-router-dom';

const drawerWidth = 240;

export default function AdminLayout({ role = 'admin' }) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [isSidebarOpen, setSidebarOpen] = useState(isDesktop);

  // Sync sidebar with screen size
  useEffect(() => {
    setSidebarOpen(isDesktop);
  }, [isDesktop]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-4 bg-white shadow">
        {/* Left: Toggle Button & Title */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="text-gray-700"
          >
            <MenuIcon />
          </button>
          <h1
            className="text-lg font-semibold transition-all duration-300"
            style={{
              transform:
                isSidebarOpen && isDesktop
                  ? `translateX(${drawerWidth}px)`
                  : 'translateX(0)',
            }}
          >
             Admin Control Center
          </h1>
        </div>

        {/* Right: Role */}
        <div className="font-semibold capitalize">{role}</div>
      </header>

      {/* Main Content */}
      <main
        className="pt-20 transition-all duration-300"
        style={{
          marginLeft: isSidebarOpen && isDesktop ? `${drawerWidth}px` : '0px',
        }}
      >
        <div className="px-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}


