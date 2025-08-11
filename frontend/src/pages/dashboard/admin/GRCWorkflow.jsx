import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Chip, Select, MenuItem, Button
} from '@mui/material';
import axios from 'axios';

const AdminGRCWorkflow = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cases
  useEffect(() => {
    axios.get('http://localhost:5000/api/cases')
      .then(res => {
        setCases(res.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  // Handle status change
  const handleStatusChange = (id, newStatus) => {
    axios.put(`http://localhost:5000/api/cases/${id}`, { status: newStatus })
      .then(res => {
        setCases(cases.map(c => c._id === id ? res.data : c));
      })
      .catch(err => console.error(err));
  };

  if (loading) return <Typography>Loading cases...</Typography>;

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
         GRC Workflow 
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Created At</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cases.map((c) => (
              <TableRow key={c._id}>
                <TableCell>{c.title}</TableCell>
                <TableCell>{c.description}</TableCell>
                <TableCell>
                  <Chip
                    label={c.status}
                    color={
                      c.status === 'pending' ? 'warning' :
                      c.status === 'in-progress' ? 'info' : 'success'
                    }
                  />
                </TableCell>
                <TableCell>{new Date(c.createdAt).toLocaleString()}</TableCell>
                <TableCell>
                  <Select
                    value={c.status}
                    onChange={(e) => handleStatusChange(c._id, e.target.value)}
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="in-progress">In Progress</MenuItem>
                    <MenuItem value="resolved">Resolved</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminGRCWorkflow;
