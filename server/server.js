const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 9001;

const nurse_list = require('./nurse_list.json');
const shift_list = require('./shift_list.json');

app.use(cors());
app.use(express.json());

app.get('/nurse', (req, res) => {
  res.status(200).send(nurse_list);
});
app.get('/shifts', (req, res) => {
  res.status(200).send(shift_list);
});
app.put('/shifts/:shift_id', (req, res) => {
  const index = shift_list.findIndex(shift => {
    return parseInt(shift.id) === parseInt(req.params.shift_id);
  });
  shift_list[index].nurseId = req.body.nurse_id;

  fs.writeFile('./shift_list.json', JSON.stringify(shift_list), function (err) {
    if (err) throw err;
    res.status(200).send('the changes have been saved');
  });
});

// Start the server.
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
