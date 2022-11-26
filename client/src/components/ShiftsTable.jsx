import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function ShiftsTable({ rows }) {
  console.log(rows);
  return (
    <TableContainer sx={{ minWidth: 650, minHeight: 650, backgroundColor: 'white'}}>
      {rows === null ? 
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box> : 
        <Table sx={{ minWidth: 600 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Shift</TableCell>
              <TableCell align="left">Start Time</TableCell>
              <TableCell align="left">End Time</TableCell>
              <TableCell align="left">Certification Required</TableCell>
              <TableCell align="left">Assigned Nurse</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name} 
                </TableCell>
                <TableCell align="left">{new Date(row.startTime).toUTCString()}</TableCell>
                <TableCell align="left">{new Date(row.endTime).toUTCString()}</TableCell>
                <TableCell align="left">{row.qualificationLevel}</TableCell>
                <TableCell align="left">{row.nurseId ? `${row.nurse.lastName} ${row.nurse.firstName}, ${row.nurse.qualificationLevel}` : ''}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      }
    </TableContainer>
  );
}
