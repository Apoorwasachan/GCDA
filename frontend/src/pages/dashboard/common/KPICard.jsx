// src/pages/dashboard/common/KPICard.jsx
import React, { useState, useEffect } from 'react';
import api from './api';

const KPICard = ({ endpoint, label }) => {
  const [count, setCount] = useState(null);
  useEffect(() => {
    api.get(endpoint).then(res => setCount(res.data.count));
  }, [endpoint]);
  return (
    <div className="p-6 bg-white rounded shadow">
      <h3 className="text-lg font-semibold">{label}</h3>
      <p className="mt-2 text-3xl">{count ?? '...'}</p>
    </div>
  );
};

export default KPICard;
