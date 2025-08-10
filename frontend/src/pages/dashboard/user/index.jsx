import { Routes, Route, Navigate } from 'react-router-dom';
import UserHome from './UserHome.jsx';

export default function UserRoutes() {
  return (
    <Routes>
      <Route index element={<UserHome />} />
      <Route path="*" element={<Navigate to="" replace />} />
    </Routes>
  );
};
