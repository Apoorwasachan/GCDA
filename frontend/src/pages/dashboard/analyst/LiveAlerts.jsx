
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box
} from '@mui/material';
import axios from 'axios';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

export default function LiveAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/alerts`);
        setAlerts(res.data);
      } catch (error) {
        console.error('Failed to fetch alerts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
    const interval = setInterval(fetchAlerts, 30000);
    return () => clearInterval(interval);
  }, []);

  // Function to get icon color based on severity
  const getIconColor = (severity) => {
    if (severity === 'high') return 'error';
    if (severity === 'medium') return 'warning';
    return 'info';
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {loading ? (
        <CircularProgress />
      ) : alerts.length === 0 ? (
        <Typography>No live alerts at the moment.</Typography>
      ) : (
        alerts.map((alert) => (
          <Card key={alert._id} className="shadow-md">
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <NotificationsActiveIcon color={getIconColor(alert.severity)} />
                <Typography variant="h6">{alert.title}</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {alert.description}
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
                Severity: {alert.severity} | Time: {new Date(alert.timestamp).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
