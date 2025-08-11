

// export default Mypolicy
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Paper, CircularProgress } from "@mui/material";

export default function UserPolicies() {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        // Assume this is the existing backend endpoint admins use to manage policies
        const res = await axios.get("http://localhost:5000/api/policies"); 

        setPolicies(res.data);
      } catch (err) {
        setError("Failed to load policies");
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, []);

  if (loading)
    return (
      <Box mt={10} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box mt={5} textAlign="center" color="error.main">
        <Typography>{error}</Typography>
      </Box>
    );

  if (policies.length === 0)
    return (
      <Box mt={5} textAlign="center">
        <Typography>No policies available.</Typography>
      </Box>
    );

  return (
    <Box sx={{ maxWidth: 700, margin: "40px auto" }}>
      <Typography variant="h4" gutterBottom>
        Policies 
      </Typography>
      {policies.map((policy) => (
        <Paper key={policy._id} sx={{ padding: 3, mb: 3 }}>
          <Typography variant="h6">{policy.title}</Typography>
          <Typography sx={{ fontStyle: "italic", mb: 1 }}>
            Category: {policy.category}
          </Typography>
          <Typography sx={{ fontStyle: "italic", mb: 1 }}>
            Effective Date: {new Date(policy.effectiveDate).toLocaleDateString()}
          </Typography>
          <Typography>{policy.description}</Typography>
        </Paper>
      ))}
    </Box>
  );
}

