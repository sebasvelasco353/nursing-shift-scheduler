const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 9001;

const nurse_list = require('./nurse_list.json');
const shift_list = require('./shift_list.json');
const { json } = require('express');

app.use(cors());
app.use(json());

app.get('/nurse', (req, res) => {
  res.status(200).send(nurse_list);
});
app.get('/shifts', (req, res) => {
  res.status(200).send(shift_list);
});
app.put('/shifts/:shift_id', (req, res) => {
  // TODO: modify the shifts_list file
  console.log(req.params);
  console.log(req.body);
  res.status(200).send(req.params)
});

// Start the server.
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
