// src/pages/dashboard/common/LiveAlerts.jsx
// src/pages/dashboard/common/LiveAlerts.jsx
import React, { useState, useEffect } from 'react';
import api from './api';

const LiveAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/alerts/live');
        // Determine if it's already an array
        if (Array.isArray(data)) {
          setAlerts(data);
        } else if (Array.isArray(data.alerts)) {
          setAlerts(data.alerts);
        } else {
          console.error('Unexpected response format:', data);
        }
      } catch (err) {
        console.error('Error loading live alerts:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <div>Loading live alerts…</div>;
  }

  if (!alerts.length) {
    return <div>No recent alerts to show</div>;
  }

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="mb-4 font-semibold">Live Alerts</h2>
      <ul>
        {alerts.map(a => (
          <li key={a._id} className="py-1 border-b">
            <span className="mr-2 capitalize">{a.severity}</span>
            <span>{a.source} @ {new Date(a.timestamp).toLocaleTimeString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LiveAlerts;

