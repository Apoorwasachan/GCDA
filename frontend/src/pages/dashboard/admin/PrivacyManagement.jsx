
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

export default function AdminDSARPage() {
  const [dsars, setDsars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusUpdates, setStatusUpdates] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const token = localStorage.getItem("token");
 const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  useEffect(() => {
    async function fetchDSARs() {
      if (!token) {
        setError("Please login as admin to view DSAR requests.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${API_BASE_URL}/api/dsar`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (Array.isArray(res.data)) {
          setDsars(res.data);
        } else {
          setError("Unexpected data format from server");
        }
      } catch (err) {
        console.error("Failed to fetch DSAR requests:", err.response || err.message);
        setError("Failed to load DSAR requests.");
      } finally {
        setLoading(false);
      }
    }

    fetchDSARs();
  }, [token]);

  const handleStatusChange = (id, newStatus) => {
    setStatusUpdates((prev) => ({ ...prev, [id]: newStatus }));
  };

  const handleUpdateStatus = async (id) => {
    const newStatus = statusUpdates[id];
    if (!newStatus) return;

    try {
      await axios.put(
        `${API_BASE_URL}/api/dsar/admin/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setDsars((prevDsars) =>
        prevDsars.map((dsar) =>
          dsar._id === id ? { ...dsar, status: newStatus } : dsar
        )
      );

      setSuccessMsg("Status updated successfully");
      setStatusUpdates((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    } catch (err) {
      console.error("Failed to update status:", err.response || err.message);
      setError("Failed to update status.");
    }
  };

  if (loading)
    return (
      <Box mt={10} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box mt={10} maxWidth={700} mx="auto">
        <Typography color="error">{error}</Typography>
      </Box>
    );

  return (
    <Box sx={{ maxWidth: 700, margin: "40px auto" }}>
      <Typography variant="h4" gutterBottom>
        DSAR Requests (Admin)
      </Typography>

      {dsars.length === 0 && <Typography>No DSAR requests found.</Typography>}

      <List>
        {dsars.map((dsar) => (
          <React.Fragment key={dsar._id}>
            <Paper sx={{ p: 2, mb: 2 }}>
              <ListItem alignItems="flex-start" disableGutters> 
      <ListItemText
  primary={`${dsar.requestType} Request by User: ${dsar.userId}`}
  secondary={
    <Box>
      <Typography
        component="span"
        variant="body2"
        color="text.primary"
        display="block"
      >
        Details: {dsar.details || "No details"}
      </Typography>
      <Typography
        component="span"
        variant="caption"
        color="text.secondary"
        display="block"
      >
        Created At: {new Date(dsar.createdAt).toLocaleString()}
      </Typography>
    </Box>
  }
  secondaryTypographyProps={{ component: "div" }}
/>


                <FormControl sx={{ minWidth: 140, ml: 2 }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={statusUpdates[dsar._id] ?? dsar.status ?? "Pending"}
                    label="Status"
                    onChange={(e) => handleStatusChange(dsar._id, e.target.value)}
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="Rejected">Rejected</MenuItem>
                  </Select>
                </FormControl>

                <Button
                  sx={{ ml: 2 }}
                  variant="contained"
                  onClick={() => handleUpdateStatus(dsar._id)}
                  disabled={!statusUpdates[dsar._id]}
                >
                  Update
                </Button>
              </ListItem>
            </Paper>
            <Divider />
          </React.Fragment>
        ))}
      </List>

      <Snackbar
        open={!!successMsg}
        autoHideDuration={4000}
        onClose={() => setSuccessMsg("")}
      >
        <Alert severity="success" onClose={() => setSuccessMsg("")}>
          {successMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
