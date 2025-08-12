
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Card, CardContent, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);

   useEffect(() => {
    axios.get(`${API_BASE_URL}/api/analytics/auditlogs`)
      .then(res => {
        console.log("Audit fetch response:", res.data);
        setLogs(Array.isArray(res.data) ? res.data : []);
      })
      .catch(err => {
        console.error("Error fetching audit logs:", err);
        setLogs([]);
      });
  }, []);
  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>Audit Logs Summary</Typography>
      <Card>
        <CardContent>
          <Typography variant="subtitle1">Recent Activities</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Timestamp</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map((log, i) => (
                <TableRow key={i}>
                  <TableCell>{log.user}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.role}</TableCell>
                  <TableCell>{log.department}</TableCell>
                  <TableCell>{log.timestamp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AuditLogs;
