
import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';  
import AdminRoutes from './admin/index.jsx';
import AnalystRoutes from './analyst/index.jsx';
import UserRoutes from './user/index.jsx';
import RequireRole from '../../routes/RequireRole.jsx';
import AnalystHome from './analyst/AnalystHome.jsx';
import LiveAlerts from './analyst/LiveAlerts.jsx';
import Trends from './analyst/Trends.jsx';
import CaseQueue from './analyst/CaseQueue.jsx';
import AuditLogs from "./analyst/analytics/AuditLogs";
import VulnerabilityDashboard from "./analyst/analytics/VulnerabilityDashboard";
import AdminHome from "./admin/AdminHome.jsx";

const DashboardLayout = () => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/" replace />;

  let decoded;
  try {
    decoded = jwtDecode(token);  
  } catch {
    localStorage.removeItem('token');
    return <Navigate to="/" replace />;
  }

  const role = decoded.role;
  return (
    <div className="min-h-screen bg-gray-100">
     

      <Routes>
        <Route index element={
          <Navigate to={
            role === 'admin' ? 'admin' :
            role === 'analyst' ? 'analyst' :
            'user'
          } replace />
        }/>

        <Route element={<RequireRole roles={['admin']} />}>
          <Route path="admin/*" element={<AdminRoutes />} />
          <Route index element={<AdminHome />} />
               <Route path="auditlogs" element={<AuditLogs />} />
        </Route>
        <Route element={<RequireRole roles={['analyst']} />}>
              <Route path="analyst/*" element={<AnalystRoutes />}>
              <Route index element={<AnalystHome />} />
               <Route path="live" element={<LiveAlerts />} />
                <Route path="trends" element={<Trends />} />
               <Route path="cases" element={<CaseQueue />} />
                <Route path="auditlogs" element={<AuditLogs />} />
                  <Route path="vulnerability" element={<VulnerabilityDashboard />} />
         </Route>
</Route>

        <Route element={<RequireRole roles={['viewer']} />}>
          <Route path="user/*" element={<UserRoutes />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />}/>
      </Routes>

      <Outlet />
    

    </div>
  );
};

export default DashboardLayout;


