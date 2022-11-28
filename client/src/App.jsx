import { useState, useEffect } from 'react';

import ShiftsTable from './components/ShiftsTable/ShiftsTable.jsx';
import ShiftModal from './components/ShiftModal/ShiftModal.jsx';
import Button from '@mui/material/Button';

import './App.css'

function App() {
  const [shifts, setShifts] = useState(null);
  const [nurses, setNurses] = useState(null);
  const [open, setOpen] = useState(false);

  const shiftsUrl = 'http://localhost:9001/shifts/';
  const nursesUrl = 'http://localhost:9001/nurse/';

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const fetchInfo = () => {
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
        setNurses(nursesResponse);

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
  }

  const handleSetShiftAssignment = (shift, nurse) => {
    fetch(`${shiftsUrl}${shift}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "nurse_id": nurse })
    }).then((res) => {
      fetchInfo();
    });
    handleCloseModal();
  };

  useEffect(() => {
    fetchInfo();
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
      <ShiftModal
        open={open}
        shifts={shifts}
        nurses={nurses}
        handleCloseModal={handleCloseModal}
        handleSetShiftAssignment={handleSetShiftAssignment}
      />
      <ShiftsTable rows={shifts} />
    </div>
  )
}

export default App
