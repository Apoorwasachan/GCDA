
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Button,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const requestTypes = ["Access", "Deletion", "Correction"];

export default function UserDSAR() {
  const [dsarRequests, setDsarRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ requestType: "Access", details: "" });
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    async function fetchDSAR() {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login to view your DSAR requests.");
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get("http://localhost:5000/api/dsar", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDsarRequests(res.data);
      } catch (err) {
        console.error("Error loading DSAR requests:", err.response || err.message);
        setError("Failed to load DSAR requests.");
      } finally {
        setLoading(false);
      }
    }
    fetchDSAR();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please login to submit a DSAR request.");
      setSubmitting(false);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/dsar",
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDsarRequests([res.data, ...dsarRequests]);
      setSuccessMsg("DSAR request submitted successfully.");
      setForm({ requestType: "Access", details: "" });
    } catch (err) {
      console.error("Failed to submit DSAR request:", err.response || err.message);
      setError("Failed to submit DSAR request.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please login to delete a DSAR request.");
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/dsar/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDsarRequests(dsarRequests.filter((req) => req._id !== id));
      setSuccessMsg("DSAR request deleted successfully.");
    } catch (err) {
      console.error("Failed to delete DSAR request:", err.response || err.message);
      setError("Failed to delete DSAR request.");
    }
  };

  if (loading)
    return (
      <Box mt={10} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ maxWidth: 700, margin: "40px auto" }}>
      <Typography variant="h4" gutterBottom>
        My DSAR Requests
      </Typography>

      {/* Submit new DSAR request */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Submit New Request
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            select
            label="Request Type"
            name="requestType"
            value={form.requestType}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          >
            {requestTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Details (optional)"
            name="details"
            value={form.details}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
            sx={{ mb: 2 }}
          />

          <Button type="submit" variant="contained" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Request"}
          </Button>
        </Box>
      </Paper>

      {/* List DSAR requests */}
      <Typography variant="h6" gutterBottom>
        Previous Requests
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {dsarRequests.length === 0 && !error && (
        <Typography>No DSAR requests found.</Typography>
      )}

      {dsarRequests.map((req) => (
        <Card key={req._id} sx={{ mb: 2, position: 'relative' }}>
          <CardContent sx={{ paddingRight: '48px' }}>
            <IconButton
              aria-label="delete"
              onClick={() => handleDelete(req._id)}
              size="large"
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
              }}
            >
              <DeleteIcon />
            </IconButton>

            <Typography variant="h6" component="div" gutterBottom>
              {req.requestType} Request
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Status: {req.status || "Pending"}
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
              {req.details || "No details provided"}
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block" mt={1}>
              Created At: {new Date(req.createdAt).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      ))}

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
