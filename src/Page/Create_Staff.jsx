import React, { useState } from "react";
import supabase from '../Services/Supabase';
import { Box } from '@mui/material';
import '../css/create_staff.css';

const Staff = () => {
  const [staff, setStaff] = useState({
    f_name: '',
    l_name: '',
    address: '',
    tel_number: '',
    date_of_birth: '',
    nin: '',
    sex: '',
    salary_scale: '',
    salary: '',
    position: ''
  });
  const [error, setError] = useState(null);

  function handleChange(event) {
    setStaff(prevFormData => ({
      ...prevFormData,
      [event.target.name]: event.target.value
    }));
  }

  async function addStaff(event) {
    event.preventDefault();
    setError(null); // Clear previous errors

    // Basic validation
    if (!staff.f_name || !staff.l_name || !staff.tel_number || !staff.position) {
      setError("Please fill in all required fields.");
      return;
    }

    const { data, error } = await supabase
      .from('staff')
      .insert({
        f_name: staff.f_name,
        l_name: staff.l_name,
        address: staff.address,
        tel_number: staff.tel_number,
        date_of_birth: staff.date_of_birth,
        nin: staff.nin,
        sex: staff.sex,
        salary_scale: staff.salary_scale,
        salary: staff.salary,
        position: staff.position
      });

    if (error) {
      console.error("Error inserting data:", error);
      setError("Failed to save staff details. Please try again.");
    } else {
      console.log("Staff added:", data);
      // Optionally, reset form or give user feedback
    }
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }} className="table-container">
      <form onSubmit={addStaff}>
        <div className="input-container">
          <input 
            type="text" 
            placeholder="First Name"
            name='f_name'
            onChange={handleChange}
            value={staff.f_name}
          />
        </div>
        <div className="input-container">
          <input 
            type="text" 
            placeholder="Last Name"
            name='l_name'
            onChange={handleChange}
            value={staff.l_name}
          />
        </div>
        <div className="input-container">
          <input 
            type="text" 
            placeholder="Address"
            name='address'
            onChange={handleChange}
            value={staff.address}
          />
        </div>
        <div className="input-container">
          <input 
            type="text" 
            placeholder="Telephone Number"
            name='tel_number'
            onChange={handleChange}
            value={staff.tel_number}
          />
        </div>
        <div className="input-container">
          <input 
            type="text" 
            placeholder="Date of Birth"
            name='date_of_birth'
            onChange={handleChange}
            value={staff.date_of_birth}
          />
        </div>
        <div className="input-container">
          <input 
            type="text" 
            placeholder="NIN"
            name='nin'
            onChange={handleChange}
            value={staff.nin}
          />
        </div>
        <div className="input-container">
          <input 
            type="text" 
            placeholder="Sex"
            name='sex'
            onChange={handleChange}
            value={staff.sex}
          />
        </div>
        <div className="input-container">
          <input 
            type="text" 
            placeholder="Salary Scale"
            name='salary_scale'
            onChange={handleChange}
            value={staff.salary_scale}
          />
        </div>
        <div className="input-container">
          <input 
            type="text" 
            placeholder="Salary"
            name='salary'
            onChange={handleChange}
            value={staff.salary}
          />
        </div>
        <div className="input-container">
          <input 
            type="text" 
            placeholder="Position"
            name='position'
            onChange={handleChange}
            value={staff.position}
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <div className="button-save">
          <button type='submit'>Save</button>
        </div>
        <div className="button-next">
            <button>Next</button>
        </div>
      </form>
    </Box>
  );
}

export default Staff;
