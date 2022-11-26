import { useState, useEffect } from 'react'
import './App.css'

import ShiftsTable from './components/ShiftsTable/ShiftsTable.jsx';
import Button from '@mui/material/Button';

function App() {
  const [shifts, setShifts] = useState(null);
  const shiftsUrl = 'http://localhost:9001/shifts/';
  const nursesUrl = 'http://localhost:9001/nurse/'

  function handleSetShiftAssignment() {
    console.log('holi');
  }

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
        onClick={handleSetShiftAssignment}
      >
        Set Shift Assignment
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
      <ShiftsTable rows={shifts} />
    </div>
  )
}

export default App
