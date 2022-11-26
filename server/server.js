const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 9001;

const nurse_list = require('./nurse_list.json');
const shift_list = require('./shift_list.json');

app.use(cors());
app.use(express.json()); // Middlware to convert req body to json.

app.get('/nurse', (req, res) => {
  res.status(200).json(nurse_list);
});
app.get('/shifts', (req, res) => {
  res.status(200).send(shift_list);
});
app.put('/shifts/:shift_id', (req, res) => {
  console.log(req.params);
  res.status(200).send({requestBody: req.body})
});

// Start the server.
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
