import { useState, useEffect } from 'react';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';

import './ShiftModal.css'

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

let newShiftId, newNurseId, newNurse, newShift;

function ShiftModal ({ open, shifts, nurses, handleCloseModal, handleSetShiftAssignment }) {
  const [selectedShift, setSelectedShift] = useState('');
  const [selectedNurse, setSelectedNurse] = useState('');
  const [error, setError] = useState('');

  const handleSelectShift = (e) => {
    newShiftId = e.target.value;
    newShift = shifts.find(shift => {
      return parseInt(shift.id) === parseInt(newShiftId);
    });
    setSelectedShift(newShiftId);
    setError('');
    if((newShiftId !== undefined) && (newNurseId !== undefined)) validateForm();
  }
  const handleSelectNurse = (e) => {
    newNurseId = e.target.value;
    newNurse = nurses.find(shift => {
      return parseInt(shift.id) === parseInt(newNurseId);
    });
    setSelectedNurse(newNurseId);
    setError('');
    if((newShiftId !== undefined) && (newNurseId !== undefined)) validateForm();
  }
  const isSaveButtonDisabled = () => {
    return selectedShift === '' || error !== '';
  }
  const validateForm = () => {
    const newError = [];
    const certifications = {
      CNA: ['CNA'],
      LPN: ['CNA', 'LPN'],
      RN: ['CNA', 'LPN', 'RN']
    };

    if (!certifications[newNurse.qualificationLevel].includes(newShift.qualificationLevel)) {
      newError.push('qualification');
      setError(newError)
    };

    var selectedNurseActualShift = Object.keys(shifts).filter(shift => shifts[shift].nurseId === newNurseId).map(shift => shifts[shift]);
    var newShiftStart = new Date(newShift.startTime).getTime();
    var newShiftEnd = new Date(newShift.endTime).getTime();

    for (let i = 0; i < selectedNurseActualShift.length; i++) {
      const nurseShift = selectedNurseActualShift[i];
      var newNurseStart = new Date(nurseShift.startTime).getTime();
      var newNurseEnd = new Date(nurseShift.endTime).getTime();

      if (((newShiftStart >= newNurseStart) && (newShiftStart <= newNurseEnd)) || ((newNurseStart >= newShiftStart) && (newNurseStart <= newShiftEnd))) {
        newError.push('overlaps');
        setError(newError)
      }
    }
  }

  return (
   <Modal
      id="setShiftModal"
      open={open}
      onClose={handleCloseModal}
      data-testid="shiftModalComponent"
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={modalStyle}
        data-testid="shiftModalComponent_body"
      >
        <h1>Set Shift Assignment</h1>

        <FormControl fullWidth>
          <label htmlFor="shift-selector">Shift</label>
          <Select
            id="shift-selector"
            value={selectedShift}
            defaultValue = ""
            label="Shift"
            onChange={handleSelectShift}
          >
            <MenuItem key={'no shift'} value={''}><b>none</b></MenuItem>
            {
              shifts && shifts.map((shift) => (
                <MenuItem key={shift.id} value={shift.id}>
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
            defaultValue = ""
            label="Nurse"
            onChange={handleSelectNurse}
          >
            <MenuItem key={'no nurse'} value={''}><b>None</b></MenuItem>
            {
              nurses && nurses.map((nurse) => (
                <MenuItem key={nurse.id} value={nurse.id}>
                  <b>{nurse.firstName} {nurse.lastName}</b>, {nurse.qualificationLevel}
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>
        { error.includes('qualification') && <Alert severity="warning">The selected nurse does'nt meet the minimum qualification level.</Alert> }
        { error.includes('overlaps') && <Alert severity="warning">The selected nurse is already working a shift that overlaps the time for the selected shift.</Alert> }
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

export default ShiftModal;
