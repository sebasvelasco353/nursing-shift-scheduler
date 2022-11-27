import { useState, useEffect } from 'react'
import './App.css'

import ShiftsTable from './components/ShiftsTable/ShiftsTable.jsx';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {
  const [shifts, setShifts] = useState(null);
  const [open, setOpen] = useState(false);

  const shiftsUrl = 'http://localhost:9001/shifts/';
  const nursesUrl = 'http://localhost:9001/nurse/'

  const handleOpenModal = () => setOpen(true); 
  const handleCloseModal = () => setOpen(false);

  useEffect(() => {
    Promise.all([
      fetch(shiftsUrl),
      fetch(nursesUrl)
    ])
    .then(([res1, res2]) => {
      Promise.all([
        res1.json(),
        res2.json()
      ])
      .then(([shiftsResponse, nursesResponse]) => {
        let rows = []
        for (let i = 0; i < shiftsResponse.length; i++) {
          const element = shiftsResponse[i];
          element.nurse = nursesResponse.find((nurse) => {
            return nurse.id === element.nurseId
          })
          rows.push(element);
          setShifts(rows);
        }
      });
    })
    .catch(error => {
      console.log(error);
    });
  }, []);

  return (
    <div className="App">
      <Button
        variant="contained"
        id='setShiftButton'
        onClick={handleOpenModal}
      >
        Set Shift Assignment
      </Button>

      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p>holis</p>
        </Box>
      </Modal>

      <ShiftsTable rows={shifts} />
    </div>
  )
}

export default App
