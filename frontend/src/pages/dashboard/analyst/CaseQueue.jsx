import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Select,
  MenuItem,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CaseQueue() {
  const [cases, setCases] = useState([]);
  const [newCase, setNewCase] = useState({ title: '', description: '' });
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  const fetchCases = async () => {
    const res = await axios.get(`${API_BASE_URL}/api/cases`);
    setCases(res.data);
  };

  const handleSubmit = async () => {
    await axios.post(`${API_BASE_URL}/api/cases`, {
      ...newCase,
      status: 'pending'
    });
    setNewCase({ title: '', description: '' });
    fetchCases();
  };

  const updateStatus = async (id, status) => {
    await axios.put(`${API_BASE_URL}/api/cases/${id}`, { status });
    fetchCases();
  };

  const deleteCase = async (id) => {
    await axios.delete(`${API_BASE_URL}/api/cases/${id}`);
    fetchCases();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-red-500 text-white';
      case 'in-progress':
        return 'bg-yellow-400 text-black';
      case 'resolved':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-300 text-black';
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  return (
    <div className="p-4 space-y-4">
      <Typography variant="h4">Case Queue</Typography>

      <div className="space-y-2">
        <input
          placeholder="Case Title"
          value={newCase.title}
          required
          onChange={(e) => setNewCase({ ...newCase, title: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Description"
          value={newCase.description}
          required
          onChange={(e) => setNewCase({ ...newCase, description: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <Button variant="contained" onClick={handleSubmit}>Submit Case</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {cases.map((c) => (
          <Card key={c._id} className="relative">
            <CardContent className="relative flex flex-col gap-2">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm px-3 py-1 rounded-full font-semibold ${getStatusColor(c.status)}`}>
                  {c.status.toUpperCase()}
                </span>
                <IconButton onClick={() => deleteCase(c._id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </div>

              <Typography variant="h6">{c.title}</Typography>
              <Typography>{c.description}</Typography>

              <Select
                value={c.status}
                onChange={(e) => updateStatus(c._id, e.target.value)}
                size="small"
                className="mt-2 bg-white"
                fullWidth
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="in-progress">In Progress</MenuItem>
                <MenuItem value="resolved">Resolved</MenuItem>
              </Select>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}






