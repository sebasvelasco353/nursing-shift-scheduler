import { useState } from 'react';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function SetShiftModal ({ open, shifts, nurses, handleCloseModal, handleSetShiftAssignment }) {
  
  const [selectedShift, setSelectedShift] = useState(null);
  const [selectedNurse, setSelectedNurse] = useState(null);

  return (
   <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <h1>Set Shift Assignment</h1>

        <FormControl fullWidth>
          <label htmlFor="demo-simple-select-1">Shift</label>
          <Select
            labelId="demo-simple-select-label-1"
            id="demo-simple-select-1"
            value={''}
            label="Age"
            onChange={handleSetShiftAssignment}
          >
            <MenuItem value={''}>none</MenuItem>
            {
              shifts && shifts.map((shift) => (
                <MenuItem key={shift.id} value={shift.id}>{shift.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <label htmlFor="demo-simple-select-1">Nurses</label>
          <Select
            labelId="demo-simple-select-label-1"
            id="demo-simple-select-1"
            value={''}
            label="Age"
            onChange={handleSetShiftAssignment}
          >
            <MenuItem key={999} value={''}>None</MenuItem>
            {
              nurses && nurses.map((nurse) => (
                <MenuItem key={nurse.id} value={nurse.id}>{nurse.firstName}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
        <Button
          variant="contained"
          id='saveAssignmentBtn'
          onClick={handleSetShiftAssignment}
        >
          Save Assignment
        </Button>
      </Box>
    </Modal>
  )
}

export default SetShiftModal
