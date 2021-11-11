const express = require('express');
const linesController = require('../controllers/linesController.js');
const router = express.Router();
 
router.get('/', linesController.get, (req, res) => {
  const result = res.locals.lines
  return res.status(200).send(result)
})

router.post('/add', linesController.add, (req, res) => res.status(200))





module.exports = router;