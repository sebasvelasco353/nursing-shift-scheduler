import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function ShiftsTable({ rows }) {
  return (
    <TableContainer sx={{ minWidth: 650, minHeight: 150, backgroundColor: 'white'}}>
      {rows === null ?
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress data-testid="loading"/>
        </Box> :
        <Table
          sx={{ minWidth: 600 }}
          aria-label="shifts table"
          data-testid="shiftsTable"
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }} align="left">Shift</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="left">Start Time</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="left">End Time</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="left"> Certification Required</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="left">Assigned Nurse</TableCell>
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
                <TableCell align="left">{row.nurseId ? `${row.nurse.firstName} ${row.nurse.lastName}, ${row.nurse.qualificationLevel}` : ''}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      }
    </TableContainer>
  );
}
