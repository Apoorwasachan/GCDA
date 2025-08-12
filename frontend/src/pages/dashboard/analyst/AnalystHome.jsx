

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Box,
   Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import AlertTrendsCard from './Trends'; 


export default function AnalystOverview() {
  const [alertData, setAlertData] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [caseData, setCaseData] = useState([]);
  const [loading, setLoading] = useState(true);
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        const [alertsRes, trendsRes, casesRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/alerts`),
          axios.get(`${API_BASE_URL}/api/alerts/trends`),
          axios.get(`${API_BASE_URL}/api/cases`)
        ]);

        setAlertData(alertsRes.data);
        setTrendData(trendsRes.data);
        setCaseData(casesRes.data);
      } catch (err) {
        console.error('Error fetching overview data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOverviewData();
  }, []);

  const totalAlerts = alertData.length;
  const totalCases = caseData.length;
  const totalTrendDays = trendData.length;

  return (
    <Box className="p-4">
      <Typography variant="h3" gutterBottom>
        Overview
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {/* Top Section: Summary Cards + Graph */}
          <Grid container spacing={4}>
            {/* Summary Cards - Left */}
            <Grid item xs={12} md={3}>
              <Card className="mt-8 mb-5 shadow-lg">
                <CardContent>
                  <Typography variant="h6">Live Alerts</Typography>
                  <Typography variant="h3" color="error">
                    {totalAlerts}
                  </Typography>
                </CardContent>
              </Card>

              <Card className="mb-6 shadow-lg">
                <CardContent>
                  <Typography variant="h6">Case Queue</Typography>
                  <Typography variant="h3" color="warning.main">
                    {totalCases}
                  </Typography>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardContent>
                  <Typography variant="h6">Trend Days</Typography>
                  <Typography variant="h3" color="primary">
                    {totalTrendDays}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

           
              <Grid item sx={{ flex: 1 }}>
              <AlertTrendsCard />
              
            </Grid>
          </Grid>

            <Box mt={4}>
      <Card className="shadow-lg">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recent Alerts
          </Typography>

          <TableContainer component={Paper} elevation={0}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Title</strong></TableCell>
                  <TableCell><strong>Severity</strong></TableCell>
                  <TableCell><strong>Date</strong></TableCell>
                  <TableCell><strong>Time</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {alertData.slice(0, 5).map((alert) => {
                  const dateObj = new Date(alert.timestamp);
                  return (
                    <TableRow key={alert._id}>
                      <TableCell>{alert.title}</TableCell>
                      <TableCell>{alert.severity}</TableCell>
                      <TableCell>{dateObj.toLocaleDateString()}</TableCell>
                      <TableCell>{dateObj.toLocaleTimeString()}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

        </CardContent>
      </Card>
        </Box>
        </>
      )}
    </Box>
  );
}


