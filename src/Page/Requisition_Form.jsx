import React, { useState } from 'react';
import supabase from '../Services/Supabase'; // Adjust path as per your project structure
import { Box, TextField, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';
import '../css/requisition_form.css'; // Import the CSS file

const Requisition_Form = () => {
  const initialFormData = {
    new_ward_id: '',
    new_staff_num: '',
    new_date_ordered: '',
    new_quantity: '',
    new_drug_num: '',
    new_item_num: '',
    new_dosage: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [requisitionResult, setRequisitionResult] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.rpc('requisition_form', {
        new_ward_id: parseInt(formData.new_ward_id),
        new_staff_num: parseInt(formData.new_staff_num),
        new_date_ordered: formData.new_date_ordered,
        new_quantity: parseInt(formData.new_quantity),
        new_drug_num: parseInt(formData.new_drug_num),
        new_item_num: parseInt(formData.new_item_num),
        new_dosage: formData.new_dosage
      });

      if (error) {
        console.error('Error:', error.message);
        return;
      }

      console.log('Data:', data); // Log data received

      if (data && data.length > 0) {
        setRequisitionResult(data[0]); // Assuming only one result is expected
        setOpenDialog(true); // Open the dialog
      } else {
        console.warn('No data returned from requisition form RPC call.');
        setRequisitionResult(null);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData(initialFormData); // Reset form inputs
    setRequisitionResult(null); // Clear requisition result
  };

  return (
    <Box sx={{ p: 3 }} className="form-container">
      <Typography variant="h4" gutterBottom>
        Requisition Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Ward ID"
          name="new_ward_id"
          value={formData.new_ward_id}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Staff Number"
          name="new_staff_num"
          value={formData.new_staff_num}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Date Ordered"
          name="new_date_ordered"
          type="date"
          value={formData.new_date_ordered}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Quantity"
          name="new_quantity"
          type="number"
          value={formData.new_quantity}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Drug Number (Optional)"
          name="new_drug_num"
          type="number"
          value={formData.new_drug_num}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Item Number (Optional)"
          name="new_item_num"
          type="number"
          value={formData.new_item_num}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Dosage (Optional)"
          name="new_dosage"
          value={formData.new_dosage}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Submit Requisition
        </Button>
      </form>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Requisition Form</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <strong>Requisition Number:</strong> {requisitionResult?.requisition_num}<br />
            <strong>Ward ID:</strong> {requisitionResult?.ward_id}<br />
            <strong>Requisitioned By:</strong> {requisitionResult?.requisitioned_by}<br />
            <strong>Ward Name:</strong> {requisitionResult?.ward_name}<br />
            <strong>Requisitioned Date:</strong> {requisitionResult?.requisitioned_date}<br />
            <strong>Supply Number:</strong> {requisitionResult?.supply_num}<br />
            <strong>Supply Name:</strong> {requisitionResult?.supply_name}<br />
            <strong>Description:</strong> {requisitionResult?.description}<br />
            <strong>Dosage:</strong> {requisitionResult?.dosage}<br />
            <strong>Method of Administration:</strong> {requisitionResult?.method_of_admin}<br />
            <strong>Cost per Unit:</strong> {requisitionResult?.cost_per_unit}<br />
            <strong>Quantity:</strong> {requisitionResult?.quantity}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Requisition_Form;
