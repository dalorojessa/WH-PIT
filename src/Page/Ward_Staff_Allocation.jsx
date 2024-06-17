import { useState } from "react";
import supabase from '../Services/Supabase';
import { Box, TextField, Button, Typography, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import '../css/ward_staff_allocation.css'; // Import the CSS file

const Ward_Staff_Allocation = () => {
  const [wardStaffAllocation, setWardStaffAllocation] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  async function fetchWardStaffAllocation() {
    try {
      setWardStaffAllocation([]); // Clear previous results
      const { data, error } = await supabase
        .rpc('fetch_staff_allocation', { ward_id_params: parseInt(searchTerm, 10) });

      if (error) {
        console.error('Error fetching staff allocation:', error.message);
        return;
      }

      console.log('Data fetched:', data); // Debugging line
      setWardStaffAllocation(data);
    } catch (error) {
      console.error('Error fetching staff allocation:', error.message);
    }
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }} className="ward-staff-allocation-container">
      <Typography variant="h4" component="h1" className="title">
        Ward Staff Allocation
      </Typography>
      <TextField
        label="Search Ward ID"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={fetchWardStaffAllocation}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {wardStaffAllocation.length > 0 && (
        <Box>
          <Typography variant="h5" component="h2">
            Wellmeadows Hospital
          </Typography>
          <Box className="ward-details">
            <Typography><strong>Ward Number:</strong> {wardStaffAllocation[0].ward_id}</Typography>
            <Typography><strong>Ward Name:</strong> {wardStaffAllocation[0].ward_name}</Typography>
            <Typography><strong>Location:</strong> {wardStaffAllocation[0].location}</Typography>
            <Typography><strong>Charge Nurse:</strong> {wardStaffAllocation[0].charge_nurse}</Typography>
            <Typography><strong>Staff Number:</strong> {wardStaffAllocation[0].staff_num}</Typography>
            <Typography><strong>Tel Extn:</strong> {wardStaffAllocation[0].tel_extn}</Typography>
            <Typography><strong>Week:</strong> {wardStaffAllocation[0].week}</Typography>
          </Box>
        </Box>
      )}
      {wardStaffAllocation.length > 0 && (
        <table className="allocation-table">
          <thead>
            <tr>
              <th>Staff No.</th>
              <th>Name</th>
              <th>Address</th>
              <th>Tel No</th>
              <th>Position</th>
              <th>Shift</th>
            </tr>
          </thead>
          <tbody>
            {wardStaffAllocation.map((staffallocation, index) => (
              <tr key={index}>
                <td>{staffallocation.staff_num}</td>
                <td>{staffallocation.name}</td>
                <td>{staffallocation.address}</td>
                <td>{staffallocation.tel_number}</td>
                <td>{staffallocation.position}</td>
                <td>{staffallocation.shift}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Box>
  );
}

export default Ward_Staff_Allocation;
