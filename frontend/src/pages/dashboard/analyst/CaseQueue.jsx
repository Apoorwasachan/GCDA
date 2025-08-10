
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Select,
//   MenuItem,
//   Chip
// } from '@mui/material';

// export default function CaseQueue() {
//   const [cases, setCases] = useState([]);
//   const [newCase, setNewCase] = useState({
//     title: '',
//     description: '',
//     priority: ''
//   });

//   const fetchCases = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/cases');
//       setCases(res.data);
//     } catch (error) {
//       console.error('Error fetching cases:', error);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!newCase.title || !newCase.description || !newCase.priority) {
//       alert('All fields are required!');
//       return;
//     }

//     try {
//       await axios.post('http://localhost:5000/api/cases', newCase);
//       setNewCase({ title: '', description: '', priority: '' });
//       fetchCases();
//     } catch (error) {
//       console.error('Error creating case:', error);
//     }
//   };

//   const updateStatus = async (id, status) => {
//     try {
//       await axios.put(`http://localhost:5000/api/cases/${id}`, { status });
//       fetchCases();
//     } catch (error) {
//       console.error('Error updating status:', error);
//     }
//   };

//   const deleteCase = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/cases/${id}`);
//       fetchCases();
//     } catch (error) {
//       console.error('Error deleting case:', error);
//     }
//   };

//   useEffect(() => {
//     fetchCases();
//   }, []);

//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case 'high': return 'error';     // red
//       case 'medium': return 'warning'; // orange/yellow
//       case 'low': return 'success';    // green
//       default: return 'default';
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'pending': return 'error';     // red
//       case 'in-progress': return 'warning'; // yellow
//       case 'resolved': return 'success';    // green
//       default: return 'default';
//     }
//   };

//   return (
//     <div className="p-4 space-y-4">
//       <Typography variant="h4">Case Queue</Typography>

//       {/* New Case Input */}
//       <div className="space-y-2">
//         <input
//           placeholder="Case Title *"
//           value={newCase.title}
//           onChange={(e) => setNewCase({ ...newCase, title: e.target.value })}
//           className="w-full p-2 bg-white border"
//         />
//         <textarea
//           placeholder="Description *"
//           value={newCase.description}
//           onChange={(e) => setNewCase({ ...newCase, description: e.target.value })}
//           className="w-full p-2 bg-white border"
//         />
//         <select
//           value={newCase.priority}
//           onChange={(e) => setNewCase({ ...newCase, priority: e.target.value })}
//           className="w-full p-2 bg-white border"
//         >
//           <option value="">Select Priority *</option>
//           <option value="high">High 🔴</option>
//           <option value="medium">Medium 🟠</option>
//           <option value="low">Low 🟢</option>
//         </select>
//         <Button variant="contained" onClick={handleSubmit}>
//           Submit Case
//         </Button>
//       </div>

//       {/* All Cases */}
//       <div className="grid gap-4 md:grid-cols-2">
//         {cases.map((c) => (
//           <Card key={c._id} className="relative">
//             <CardContent>
//               <Typography variant="h6">{c.title}</Typography>
//               <Typography>{c.description}</Typography>

//               <div className="flex flex-wrap gap-2 my-2">
//                 {c.priority && (
//                   <Chip
//                     label={`Priority: ${c.priority}`}
//                     color={getPriorityColor(c.priority)}
//                     variant="outlined"
//                   />
//                 )}
//                 {c.status && (
//                   <Chip
//                     label={`Status: ${c.status}`}
//                     color={getStatusColor(c.status)}
//                     variant="filled"
//                   />
//                 )}
//               </div>

//               <div className="my-2">
//                 <Select
//                   value={c.status}
//                   onChange={(e) => updateStatus(c._id, e.target.value)}
//                   size="small"
//                   className="w-full"
//                 >
//                   <MenuItem value="pending">Pending</MenuItem>
//                   <MenuItem value="in-progress">In Progress</MenuItem>
//                   <MenuItem value="resolved">Resolved</MenuItem>
//                 </Select>
//               </div>

//               <Button
//                 variant="outlined"
//                 color="error"
//                 onClick={() => deleteCase(c._id)}
//                 className="mt-2"
//               >
//                 Delete
//               </Button>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }
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

  const fetchCases = async () => {
    const res = await axios.get('http://localhost:5000/api/cases');
    setCases(res.data);
  };

  const handleSubmit = async () => {
    await axios.post('http://localhost:5000/api/cases', {
      ...newCase,
      status: 'pending'
    });
    setNewCase({ title: '', description: '' });
    fetchCases();
  };

  const updateStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/api/cases/${id}`, { status });
    fetchCases();
  };

  const deleteCase = async (id) => {
    await axios.delete(`http://localhost:5000/api/cases/${id}`);
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






