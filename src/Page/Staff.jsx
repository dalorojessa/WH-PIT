import { useEffect, useState } from "react";
import supabase from '../Services/Supabase';
import { Box, Button } from '@mui/material';
import { Link } from "react-router-dom";
import '../css/staff.css';

const Staff = () => {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    fetchStaff();
  }, []);

  async function fetchStaff() {
    try {
      const { data, error } = await supabase
        .from('staff')
        .select('*');

      if (error) {
        console.error('Error fetching staff:', error.message);
        return;
      }

      setStaff(data);
      console.log(data); // Check if data is fetched correctly
    } catch (error) {   
      console.error('Error fetching staff:', error.message);
    }
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Telephone Number</th>
              <th>Date of Birth</th>
              <th>NIN</th>
              <th>Sex</th>
              <th>Salary Scale</th>
              <th>Salary</th>
              <th>Position</th>
            </tr>
          </thead>

          <tbody>
            {staff.map((staffMember) => (
              <tr key={staffMember.staff_num}>
                <td>{staffMember.staff_num}</td>
                <td>{staffMember.f_name}</td>
                <td>{staffMember.l_name}</td>
                <td>{staffMember.address}</td>
                <td>{staffMember.tel_number}</td>
                <td>{staffMember.date_of_birth}</td>
                <td>{staffMember.nin}</td>
                <td>{staffMember.sex}</td>
                <td>{staffMember.salary_scale}</td>
                <td>{staffMember.salary}</td>
                <td>{staffMember.position}</td>
                <td className="button-cell">
                <Link to="">
                  <Button
                    variant="contained"
                    color="primary"
                  >
                    MORE
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

export default Staff;
