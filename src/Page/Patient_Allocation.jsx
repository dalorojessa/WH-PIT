import { useState } from "react";
import supabase from '../Services/Supabase';
import { Box, TextField, Button, Typography, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import '../css/patient_allocation.css'; // Import the CSS file

const Patient_Allocation = () => {
  const [patientAllocation, setPatientAllocation] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  async function fetchPatientAllocation() {
    try {
        setPatientAllocation([]); // Clear previous results
      const { data, error } = await supabase
        .rpc('fetch_patient_allocation', { ward_id_params: parseInt(searchTerm, 10) });

      if (error) {
        console.error('Error fetching patient allocation:', error.message);
        return;
      }

      console.log('Data fetched:', data); // Debugging line
      setPatientAllocation(data);
    } catch (error) {
      console.error('Error fetching patient allocation:', error.message);
    }
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }} className="ward-staff-allocation-container">
      <Typography variant="h4" component="h1" className="title">
        Patient Allocation
      </Typography>
      <TextField
        label="Search Ward ID"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={fetchPatientAllocation}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {patientAllocation.length > 0 && (
        <Box>
          <Typography variant="h5" component="h2">
            Wellmeadows Hospital
          </Typography>
          <Box className="ward-details">
            <Typography><strong>Ward Number:</strong> {patientAllocation[0].ward_id}</Typography>
            <Typography><strong>Ward Name:</strong> {patientAllocation[0].ward_name}</Typography>
            <Typography><strong>Location:</strong> {patientAllocation[0].location}</Typography>
            <Typography><strong>Charge Nurse:</strong> {patientAllocation[0].charge_nurse}</Typography>
            <Typography><strong>Staff Number:</strong> {patientAllocation[0].staff_num}</Typography>
            <Typography><strong>Tel Extn:</strong> {patientAllocation[0].tel_extn}</Typography>
            <Typography><strong>Week:</strong> {patientAllocation[0].week}</Typography>
          </Box>
        </Box>
      )}
      {patientAllocation.length > 0 && (
        <table className="allocation-table">
          <thead>
            <tr>
              <th>Patient Number</th>
              <th>Name</th>
              <th>On Waiting List</th>
              <th>Expected Stay (Days)</th>
              <th>Date Placed</th>
              <th>Date Leave</th>
              <th>Actual Leave</th>
              <th>Bed Number</th>
            </tr>
          </thead>
          <tbody>
            {patientAllocation.map((patientallocation, index) => (
              <tr key={index}>
                <td>{patientallocation.patient_num}</td>
                <td>{patientallocation.name}</td>
                <td>{patientallocation.on_waiting_list}</td>
                <td>{patientallocation.expected_stay}</td>
                <td>{patientallocation.date_placed}</td>
                <td>{patientallocation.date_leave}</td>
                <td>{patientallocation.actual_leave}</td>
                <td>{patientallocation.bed_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Box>
  );
}

export default Patient_Allocation;
