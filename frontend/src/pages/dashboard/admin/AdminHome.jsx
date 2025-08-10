// src/pages/dashboard/admin/AdminHome.jsx
import React from 'react';
import KPICard from '../common/KPICard.jsx';
import LiveAlerts from '../common/LiveAlerts.jsx';
import { Link } from 'react-router-dom';

export default function AdminHome() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Admin Control Panel</h1>
      <div className="grid gap-6 lg:grid-cols-3">
        <KPICard endpoint="/admin/kpis/total-alerts" label="Total Alerts / 24h" />
        <KPICard endpoint="/admin/kpis/open-vulns" label="Open Vulnerabilities" />
        <Link to="users" className="p-4 text-white bg-green-500 rounded shadow">User Management →</Link>
      </div>
      <LiveAlerts />
    </div>
  );
}
