import React from "react";
import { BrowserRouter as Router, Route, Routes,Navigate} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import './App.css'
import DashboardLayout from './pages/dashboard/index.jsx';
import RequireRole from './routes/RequireRole.jsx';





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
        
           

   
      </Routes>
    </Router>
     
    </>
  )
}

export default App
