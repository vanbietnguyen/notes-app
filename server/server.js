const express = require('express');
const app = express();
const path = require('path');
const PORT = 5000
const cors = require('cors')

const controller = require('controller.js')
const router = require('router.js')

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  return res.sendStatus(200);
});

//routers
app.use('/api/login')
app.use('/api/notes')
app.use('api/lines')

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = { app };