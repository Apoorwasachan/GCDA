
import React, { useState, useEffect } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import UserSidebar from './Sidebar'; // Your user sidebar component file
import MenuIcon from '@mui/icons-material/Menu';
import { Outlet } from 'react-router-dom';

const drawerWidth = 240;

export default function UserLayout({ role = 'user' }) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [isSidebarOpen, setSidebarOpen] = useState(isDesktop);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  // Sync sidebar visibility with screen size
  useEffect(() => {
    setSidebarOpen(isDesktop);
  }, [isDesktop]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <UserSidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-4 bg-white shadow">
        {/* Left: Toggle + shifting "GCDA Dashboard" */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="text-gray-700"
            aria-label="Toggle sidebar"
          >
            <MenuIcon />
          </button>
          <h1
            className="text-lg font-semibold transition-all duration-300"
            style={{
              transform: isSidebarOpen && isDesktop ? `translateX(${drawerWidth}px)` : 'translateX(0)',
            }}
          >
            GCDA Dashboard
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

