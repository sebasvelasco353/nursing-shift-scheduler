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
          const shift = shiftsResponse[i];
          shift.nurses = [];
          if ((shift.nursesId !== null) && (shift.nursesId.length > 0)) {
            for (let i = 0; i < shift.nursesId.length; i++) {
              const nurseId = shift.nursesId[i];
              const foundNurse = nursesResponse.find((nurse) => {
                return nurse.id === nurseId;
              });
              shift.nurses.push(foundNurse);
            }
          }
          rows.push(shift);
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
      <header data-testid="app-header">
        <h1>Nurse Shift Scheduler</h1>
        <Button
          variant="contained"
          id='setShiftButton'
          data-testid="setShiftButton"
          onClick={handleOpenModal}
        >
          Set Shift Assignment
        </Button>
      </header>
      <ShiftModal
        open={open}
        shifts={shifts}
        nurses={nurses}
        handleCloseModal={handleCloseModal}
        handleSetShiftAssignment={handleSetShiftAssignment}
      />
      <div className="tableContainer" data-testid="tableContainer">
        <ShiftsTable rows={shifts} />
      </div>
    </div>
  )
}

export default App
