import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function ShiftsTable({ rows }) {
  const dateFormatOptions = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit' };

  function getRandomKey() {
    var result = 'a';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 5; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

  const renderNursesInfo = (nurses) => {
    let text = nurses.map((nurse) => {
        return <p key={getRandomKey()}>{nurse.firstName} {nurse.lastName}, {nurse.qualificationLevel}</p>;
      });
    return text;
  }

  return (
    <TableContainer id="tableContainer" sx={{ minWidth: 650, minHeight: 150, backgroundColor: 'white'}}>
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
                key={getRandomKey()}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{new Date(row.startTime).toLocaleDateString("en-US", dateFormatOptions)}</TableCell>
                <TableCell align="left">{new Date(row.endTime).toLocaleDateString("en-US", dateFormatOptions)}</TableCell>
                <TableCell align="left">{row.qualificationLevel}</TableCell>
                <TableCell align="left">{row.nurses.length > 0 ? renderNursesInfo(row.nurses) : ''}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      }
    </TableContainer>
  );
}
