
import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';
import axios from 'axios';
import { Typography, Paper } from '@mui/material';

export default function TrendsChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/alerts/trends');
        const formatted = res.data.map(item => ({
          date: item.date,
          low: item.counts?.low || 0,
          medium: item.counts?.medium || 0,
          high: item.counts?.high || 0
        }));
        setData(formatted);
      } catch (err) {
        console.error('Error fetching trend data', err);
      }
    };

    fetchTrends();
  }, []);

  return (
    <div>
      {/*Heading */}
      <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold' }}>
        Alert Trends (Last 7 Days)
      </Typography>

      {/* Chart Container */}
      <Paper elevation={3} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px' }}>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            {/*  X-Axis (Date) */}
            <XAxis dataKey="date" label={{ value: 'Date', position: 'insideBottom', offset: -5 }} />

            {/* Y-Axis (Count) */}
            <YAxis allowDecimals={false} label={{ value: 'Number of alerts', angle: -90, position: 'insideLeft' }} />

            {/* Tooltip & Legend */}
            <Tooltip />
            <Legend verticalAlign="top" height={36} />

           
            <Line type="monotone" dataKey="low" stroke="#2196f3" name="Low Severity" strokeWidth={2} />
            <Line type="monotone" dataKey="medium" stroke="#ff9800" name="Medium Severity" strokeWidth={2} />
            <Line type="monotone" dataKey="high" stroke="#f44336" name="High Severity" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </div>
  );
}


