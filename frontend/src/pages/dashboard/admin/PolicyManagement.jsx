import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography, MenuItem, Paper, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const PolicyManagement = () => {
  const [policies, setPolicies] = useState([]);
  const [newPolicy, setNewPolicy] = useState({
    title: "",
    description: "",
    category: "Security",
    effectiveDate: ""
  });

  // Fetch policies
  const fetchPolicies = async () => {
    const res = await axios.get("http://localhost:5000/api/policies");
    setPolicies(res.data);
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  // Add policy
  const handleAddPolicy = async () => {
    if (!newPolicy.title || !newPolicy.description || !newPolicy.effectiveDate) {
      alert("Please fill all required fields");
      return;
    }
    await axios.post("http://localhost:5000/api/policies", newPolicy);
    setNewPolicy({ title: "", description: "", category: "Security", effectiveDate: "" });
    fetchPolicies();
  };

  // Delete policy
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/policies/${id}`);
    fetchPolicies();
  };

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>Policy Management</Typography>

      {/* Form to Add Policy */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">Add New Policy</Typography>
        <TextField
          fullWidth
          label="Title"
          value={newPolicy.title}
          onChange={(e) => setNewPolicy({ ...newPolicy, title: e.target.value })}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          label="Description"
          multiline
          rows={3}
          value={newPolicy.description}
          onChange={(e) => setNewPolicy({ ...newPolicy, description: e.target.value })}
          sx={{ mt: 2 }}
        />
        <TextField
          select
          fullWidth
          label="Category"
          value={newPolicy.category}
          onChange={(e) => setNewPolicy({ ...newPolicy, category: e.target.value })}
          sx={{ mt: 2 }}
        >
          <MenuItem value="Security">Security</MenuItem>
          <MenuItem value="Compliance">Compliance</MenuItem>
          <MenuItem value="IT">IT</MenuItem>
          <MenuItem value="HR">HR</MenuItem>
        </TextField>
        <TextField
          fullWidth
          type="date"
          label="Effective Date"
          InputLabelProps={{ shrink: true }}
          value={newPolicy.effectiveDate}
          onChange={(e) => setNewPolicy({ ...newPolicy, effectiveDate: e.target.value })}
          sx={{ mt: 2 }}
        />
        <Button variant="contained" onClick={handleAddPolicy} sx={{ mt: 2 }}>Add Policy</Button>
      </Paper>

      {/* Policy List */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Existing Policies</Typography>
        {policies.map((policy) => (
          <Box key={policy._id} display="flex" justifyContent="space-between" alignItems="center" sx={{ borderBottom: "1px solid #ccc", py: 1 }}>
            <Box>
              <Typography variant="subtitle1">{policy.title} ({policy.category})</Typography>
              <Typography variant="body2">{policy.description}</Typography>
              <Typography variant="caption">Effective: {new Date(policy.effectiveDate).toLocaleDateString()}</Typography>
            </Box>
            <IconButton color="error" onClick={() => handleDelete(policy._id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Paper>
    </Box>
  );
};

export default PolicyManagement;

