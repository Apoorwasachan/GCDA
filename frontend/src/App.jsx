import React from "react";
import { BrowserRouter as Router, Route, Routes,Navigate} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import './App.css'
import DashboardLayout from './pages/dashboard/index.jsx';
import RequireRole from './routes/RequireRole.jsx';
// import AnalystDashboard from './pages/dashboard/analyst/index.jsx';
// import AnalystHome from './pages/dashboard/analyst/AnalystHome.jsx';
// import LiveAlerts from './pages/dashboard/analyst/LiveAlerts.jsx';
// import Trends from './pages/dashboard/analyst/Trends.jsx';
// import CaseQueue from './pages/dashboard/analyst/CaseQueue.jsx';
// import AuditLogs from "./pages/dashboard/analyst/analytics/AuditLogs";
// import VulnerabilityDashboard from "./pages/dashboard/analyst/analytics/VulnerabilityDashboard";




function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<RequireRole roles={['admin', 'analyst', 'viewer']} />}>
        <Route path="/dashboard/*" element={<DashboardLayout />} />  
        </Route>
         <Route path="*" element={<Navigate to="/" replace />} />
        
           
{/*            
           <Route element={<RequireRole roles={['analyst']} />}>
          <Route path="/dashboard" element={<AnalystDashboard />}>
          <Route index element={<AnalystHome />} />
          <Route path="live" element={<LiveAlerts />} />
          <Route path="trends" element={<Trends />} />
          <Route path="cases" element={<CaseQueue />} />
          <Route path="auditlogs" element={<AuditLogs />} />
           <Route path="vulnerability" element={<VulnerabilityDashboard />} /></Route>
           </Route> */}
   
      </Routes>
    </Router>
     
    </>
  )
}

export default App
