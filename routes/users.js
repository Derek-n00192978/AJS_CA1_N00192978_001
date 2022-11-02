const express = require('express');
const router = express.Router();

const { 
   register,
   login
  } = require('../controllers/user_controller');

router
    //.get('/', readData)
    //.get('/:id', readOne)
    .post('/register', register)
    .post('/login', login)
    //.put('/:id', updateData)
    //.delete('/:id', deleteData);

module.exports = router;