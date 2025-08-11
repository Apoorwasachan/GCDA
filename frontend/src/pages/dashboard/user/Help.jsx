import React from "react";
import { Box, Typography, Link, Paper } from "@mui/material";

export default function HelpSupport() {
  return (
    <Box sx={{ maxWidth: 700, margin: "40px auto", p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Help & Support
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          User Guide
        </Typography>
        <Typography>
          Please refer to the{" "}
          <Link href="/user-guide.pdf" target="_blank" rel="noopener">
            User Guide (PDF)
          </Link>{" "}
          for detailed instructions on using the system.
        </Typography>
      </Paper>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Admin Contact
        </Typography>
        <Typography>Name: shivay</Typography>
        <Typography>Email: <Link href="mailto:admin@company.com">admin@company.com</Link></Typography>
        <Typography>Phone: +1 234 567 8901</Typography>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Analyst Contact
        </Typography>
        <Typography>Name: Anuj</Typography>
        <Typography>Email: <Link href="mailto:analyst@company.com">analyst@company.com</Link></Typography>
        <Typography>Phone: +1 234 567 8902</Typography>
      </Paper>
    </Box>
  );
}
