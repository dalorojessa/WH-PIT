import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import supabase from '../Services/Supabase';

const NextOfKinPage = () => {
  const [nextOfKinDetails, setNextOfKinDetails] = useState({
    fullName: '',
    relationship: '',
    address: '',
    tel_number: ''
  });

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const patientNum = queryParams.get('patient_num');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNextOfKinDetails(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      // Insert next of kin details along with patient_num
      const { data: nextOfKinData, error: insertError } = await supabase
        .from('next_of_kin')
        .insert({
          full_name: nextOfKinDetails.fullName,
          relationship_to_the_patient: nextOfKinDetails.relationship,
          address: nextOfKinDetails.address,
          tel_number: nextOfKinDetails.tel_number,
          patient_num: patientNum // Include patient_num in the insert
        });

      if (insertError) {
        console.error('Error saving next-of-kin details:', insertError.message);
        throw new Error('Error saving next-of-kin details');
      } else {
        console.log('Next-of-kin details saved successfully:', nextOfKinData);
        // Clear the input fields
        setNextOfKinDetails({
          fullName: '',
          relationship: '',
          address: '',
          tel_number: ''
        });
        alert('Next-of-kin details saved successfully!');
      }

      navigate('/dashboard/patient-appointment');
    } catch (error) {
      console.error(error);
      alert('An error occurred while saving the next-of-kin details.');
    }
  };

  const handleSkip = () => {
    alert('Patient details saved successfully!');
    navigate('/dashboard/patient-appointment');
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <h2>Next of Kin Page</h2>
      <form>
        <TextField
          label="Full Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="fullName"
          value={nextOfKinDetails.fullName}
          onChange={handleInputChange}
        />
        <TextField
          label="Relationship"
          variant="outlined"
          fullWidth
          margin="normal"
          name="relationship"
          value={nextOfKinDetails.relationship}
          onChange={handleInputChange}
        />
        <TextField
          label="Address"
          variant="outlined"
          fullWidth
          margin="normal"
          name="address"
          value={nextOfKinDetails.address}
          onChange={handleInputChange}
        />
        <TextField
          label="Telephone Number"
          variant="outlined"
          fullWidth
          margin="normal"
          name="tel_number"
          value={nextOfKinDetails.tel_number}
          onChange={handleInputChange}
        />
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSkip}
          >
            Skip
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default NextOfKinPage;
