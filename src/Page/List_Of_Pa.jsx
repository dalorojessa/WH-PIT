import { useEffect, useState } from "react";
import supabase from '../Services/Supabase';
import { Box, Select, MenuItem, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import '../css/listofpa.css';

const List_Of_Pa = () => {
  const [listOfPa, setListOfPa] = useState([]);

  useEffect(() => {
    fetchListOfPa();
  }, []);

  async function fetchListOfPa() {
    try {
      const { data, error } = await supabase
        .from('patient_appointment')
        .select('*');

      if (error) {
        console.error('Error fetching patient appointments:', error.message);
        return;
      }

      setListOfPa(data);
      console.log(data); // Check if data is fetched correctly
    } catch (error) {
      console.error('Error fetching patient appointments:', error.message);
    }
  }

  const handleRecommendationChange = async (appointmentId, newValue) => {
    try {
      // Update the recommendation in the database
      const { error } = await supabase
        .from('patient_appointment')
        .update({ recommended_to: newValue }) // Specify the new value for the recommended_to column
        .eq('appointment_num', appointmentId); // Filter to update the row where appointment_num equals appointmentId

      if (error) {
        console.error('Error updating recommendation:', error.message);
        return;
      }

      // Update the state to reflect the new recommendation value
      setListOfPa(prevList => prevList.map(item =>
        item.appointment_num === appointmentId ? { ...item, recommended_to: newValue } : item
      ));
    } catch (error) {
      console.error('Error updating recommendation:', error.message);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }} className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Appointment ID</th>
            <th>Date and Time</th>
            <th>Examination Room</th>
            <th>Staff ID</th>
            <th>Clinic ID</th>
            <th>Recommended to</th>
          </tr>
        </thead>
        <tbody>
          {listOfPa.map((appointment) => (
            <tr key={appointment.appointment_num}>
              <td>{appointment.appointment_num}</td>
              <td>{appointment.date_and_time}</td>
              <td>{appointment.exam_room}</td>
              <td>{appointment.staff_num}</td>
              <td>{appointment.clinic_num}</td>
              <td className="select-cell">
                <Select
                  value={appointment.recommended_to}
                  onChange={(e) => handleRecommendationChange(appointment.appointment_num, e.target.value)}
                  fullWidth
                  variant="outlined"
                >
                  <MenuItem value="In-patient">In-patient</MenuItem>
                  <MenuItem value="Out-patient">Out-patient</MenuItem>
                </Select>
              </td>
              <td className="button-cell">
                <Link to="/patient_page">
                  <Button
                    variant="contained"
                    color="primary"
                  >
                    Add Patient
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
}

export default List_Of_Pa;
