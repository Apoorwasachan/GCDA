import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@mui/material";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "viewer" });

  // Fetch all users
  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add new user
  const handleAddUser = async () => {
    if (!form.name || !form.email || !form.password) return alert("All fields required");
    await axios.post("http://localhost:5000/api/users/add", form);
    setForm({ name: "", email: "", password: "", role: "viewer" });
    fetchUsers();
  };

  // Delete user
  const handleDeleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    fetchUsers();
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>User Management</Typography>

      {/* Form Container */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6">Add New User</Typography>
        <Box display="flex" gap={2} flexWrap="wrap" mt={2}>
          <TextField label="Name" name="name" value={form.name} onChange={handleChange} />
          <TextField label="Email" name="email" value={form.email} onChange={handleChange} />
          <TextField label="Password" type="password" name="password" value={form.password} onChange={handleChange} />
          <TextField
            select
            label="Role"
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="analyst">Analyst</MenuItem>
            <MenuItem value="viewer">Viewer</MenuItem>
          </TextField>
          <Button variant="contained" onClick={handleAddUser}>Add User</Button>
        </Box>
      </Paper>

      {/* Users Table */}
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button color="error" onClick={() => handleDeleteUser(user._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
