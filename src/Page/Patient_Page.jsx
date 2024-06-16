import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import supabase from '../Services/Supabase';

const Patient_Page = () => {
  const [patientDetails, setPatientDetails] = useState({
    firstName: '',
    lastName: '',
    address: '',
    tel_number: '',
    date_of_birth: '',
    sex: '',
    marital_status: '',
    hospital_date_registered: ''
  });

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const appointmentNum = queryParams.get('appointment_num');
  const recommendedTo = queryParams.get('recommended_to');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientDetails(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      // Insert patient details and retrieve patient_num
      const { data: patientData, error: insertError } = await supabase
        .from('patient')
        .insert({
          f_name: patientDetails.firstName,
          l_name: patientDetails.lastName,
          address: patientDetails.address,
          tel_number: patientDetails.tel_number,
          date_of_birth: patientDetails.date_of_birth,
          sex: patientDetails.sex,
          marital_status: patientDetails.marital_status,
          hospital_date_registered: patientDetails.hospital_date_registered
        })
        .select('patient_num'); // Use 'select' to return only patient_num
    
      if (insertError) {
        console.error('Error saving patient details:', insertError.message);
        throw new Error('Error saving patient details');
      }
    
      // Check if patientData and patient_num are valid
      const patientNum = patientData[0]?.patient_num;
      if (!patientNum) {
        console.error('Generated patient number is missing or invalid:', patientData);
        throw new Error('Generated patient number is missing or invalid');
      }

      console.log('Generated patient number:', patientNum);
      console.log('Recommended to:', recommendedTo);

      // Check for existing appointment_num in both tables
      const { data: inPatientData, error: inPatientError } = await supabase
        .from('in_patient')
        .select('appointment_num')
        .eq('appointment_num', appointmentNum);

      const { data: outPatientData, error: outPatientError } = await supabase
        .from('out_patient')
        .select('appointment_num')
        .eq('appointment_num', appointmentNum);

      if (inPatientError || outPatientError) {
        console.error('Error checking existing appointment:', inPatientError || outPatientError);
        throw new Error('Error checking existing appointment');
      }
  
      // Insert into the correct table based on recommendedTo
      if (recommendedTo === "Out-patient") {
        await insertIntoOutPatient(patientNum, appointmentNum);
      } else if (recommendedTo === "In-patient") {
        await insertIntoInPatient(patientNum, appointmentNum);
      }

      // Navigate to NextOfKinPage with patient_num
      navigate(`/next-of-kin?patient_num=${patientNum}`);
  
    } catch (error) {
      console.error('Error handling save:', error.message);
      // Handle error gracefully, e.g., show error message to user
    }
  };

  const insertIntoOutPatient = async (patientNum, appointmentNum) => {
    try {
      const { data, error } = await supabase
        .from('out_patient')
        .insert({
          patient_num: patientNum,
          appointment_num: appointmentNum,
        })
        .select();
  
      if (error) {
        console.error('Error inserting into out_patient:', error.message);
        throw new Error('Error inserting into out_patient');
      }
  
      console.log('Successfully inserted into out_patient:', data);
    } catch (error) {
      console.error('Error inserting into out_patient:', error.message);
      throw error;
    }
  };
  
  const insertIntoInPatient = async (patientNum, appointmentNum) => {
    try {
      const { data, error } = await supabase
        .from('in_patient')
        .insert({
          patient_num: patientNum,
          appointment_num: appointmentNum,
        })
        .select();
  
      if (error) {
        console.error('Error inserting into in_patient:', error.message);
        throw new Error('Error inserting into in_patient');
      }
  
      console.log('Successfully inserted into in_patient:', data);
    } catch (error) {
      console.error('Error inserting into in_patient:', error.message);
      throw error;
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <h2>Patient Page</h2>
      <form>
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="firstName"
          value={patientDetails.firstName}
          onChange={handleInputChange}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="lastName"
          value={patientDetails.lastName}
          onChange={handleInputChange}
        />
        <TextField
          label="Address"
          variant="outlined"
          fullWidth
          margin="normal"
          name="address"
          value={patientDetails.address}
          onChange={handleInputChange}
        />
        <TextField
          label="Telephone Number"
          variant="outlined"
          fullWidth
          margin="normal"
          name="tel_number"
          value={patientDetails.tel_number}
          onChange={handleInputChange}
        />
        <TextField
          label="Date of Birth"
          variant="outlined"
          fullWidth
          margin="normal"
          name="date_of_birth"
          value={patientDetails.date_of_birth}
          onChange={handleInputChange}
        />
        <TextField
          label="Sex"
          variant="outlined"
          fullWidth
          margin="normal"
          name="sex"
          value={patientDetails.sex}
          onChange={handleInputChange}
        />
        <TextField
          label="Marital Status"
          variant="outlined"
          fullWidth
          margin="normal"
          name="marital_status"
          value={patientDetails.marital_status}
          onChange={handleInputChange}
        />
        <TextField
          label="Hospital Date Registered"
          variant="outlined"
          fullWidth
          margin="normal"
          name="hospital_date_registered"
          value={patientDetails.hospital_date_registered}
          onChange={handleInputChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
        >
          Next
        </Button>
      </form>
    </Box>
  );
};

export default Patient_Page;
