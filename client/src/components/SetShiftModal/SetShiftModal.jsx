import { useState } from 'react';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

let newShift, newNurse;

function SetShiftModal ({ open, shifts, nurses, handleCloseModal, handleSetShiftAssignment }) {

  const [selectedShift, setSelectedShift] = useState('');
  const [selectedNurse, setSelectedNurse] = useState('');
  const [error, setError] = useState('');

  const handleSelectShift = (e) => {
    newShift = e.target.value;
    setSelectedShift(newShift);
    setError('');
    if((newShift !== undefined) && (newNurse !== undefined)) validateForm();
  }
  const handleSelectNurse = (e) => {
    newNurse = e.target.value;
    setSelectedNurse(newNurse);
    setError('');
    if((newShift !== undefined) && (newNurse !== undefined)) validateForm();
  }
  const isSaveButtonDisabled = () => {
    return selectedShift === '' || error !== '';
  }
  const validateForm = () => {
    const certifications = {
      CNA: ['CNA'],
      LPN: ['CNA', 'LPN'],
      RN: ['CNA', 'LPN', 'RN']
    };
    if (!certifications[newNurse.qualificationLevel].includes(newShift.qualificationLevel)) setError('The selected nurse dosent meet the minimum qualification level.');
  }

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
          <label htmlFor="shift-selector">Shift</label>
          <Select
            id="shift-selector"
            value={selectedShift}
            label="Shift"
            onChange={handleSelectShift}
          >
            <MenuItem key={'no shift'} value={''}><b>none</b></MenuItem>
            {
              shifts && shifts.map((shift) => (
                <MenuItem key={shift.id} value={shift}>
                  <b>{shift.name}</b>,<b>{shift.qualificationLevel}</b>, {new Date(shift.startTime).toUTCString()}
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <label htmlFor="nurse-selector">Nurses</label>
          <Select
            id="nurse-selector"
            value={selectedNurse}
            label="Nurse"
            onChange={handleSelectNurse}
          >
            <MenuItem key={'no nurse'} value={''}><b>None</b></MenuItem>
            {
              nurses && nurses.map((nurse) => (
                <MenuItem key={nurse.id} value={nurse}>
                  <b>{nurse.firstName} {nurse.lastName}</b>, {nurse.qualificationLevel}
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>
        { error !== '' && <Alert severity="warning">{error}</Alert> }
        <Button
          variant="contained"
          id='saveAssignmentBtn'
          disabled={isSaveButtonDisabled()}
          onClick={() => handleSetShiftAssignment(selectedShift, selectedNurse)}
        >
          Save Assignment
        </Button>
      </Box>
    </Modal>
  )
}

export default SetShiftModal
