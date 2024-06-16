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
    } catch (error) {
      console.error('Error fetching patient appointments:', error.message);
    }
  }

  const handleRecommendationChange = async (appointmentId, newValue) => {
    try {
      // Update recommendation in patient_appointment table
      const { error: updateError } = await supabase
        .from('patient_appointment')
        .update({ recommended_to: newValue })
        .eq('appointment_num', appointmentId);

      if (updateError) {
        console.error('Error updating recommendation:', updateError.message);
        throw updateError;
      }

      // Delete existing records in both in_patient and out_patient tables
      const { error: deleteError1 } = await supabase
        .from('in_patient')
        .delete()
        .eq('appointment_num', appointmentId);

      if (deleteError1) {
        console.error('Error deleting from in_patient:', deleteError1.message);
        throw deleteError1;
      }

      const { error: deleteError2 } = await supabase
        .from('out_patient')
        .delete()
        .eq('appointment_num', appointmentId);

      if (deleteError2) {
        console.error('Error deleting from out_patient:', deleteError2.message);
        throw deleteError2;
      }

      // Insert new record based on the updated recommendation
      const table = newValue === 'In-patient' ? 'in_patient' : 'out_patient';
      const { error: insertError } = await supabase
        .from(table)
        .insert({ appointment_num: appointmentId });

      if (insertError) {
        console.error(`Error inserting into ${table}:`, insertError.message);
        throw insertError;
      }

      // Update the state to reflect the new recommendation value
      setListOfPa(prevList => prevList.map(item =>
        item.appointment_num === appointmentId ? { ...item, recommended_to: newValue } : item
      ));
    } catch (error) {
      console.error('Error handling recommendation change:', error.message);
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
                <Link to={`/patient_page?appointment_num=${appointment.appointment_num}&recommended_to=${appointment.recommended_to}`}>
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
